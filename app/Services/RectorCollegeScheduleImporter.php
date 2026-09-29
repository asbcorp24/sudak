<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\ScheduleEntry;
use App\Models\ScheduleGroup;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use RuntimeException;
use SimpleXMLElement;
use XMLReader;

class RectorCollegeScheduleImporter
{
    public function import(string $path, string $mode='merge'): array
    {
        $data=$this->parse($path);

        if (!$data['patterns']) {
            throw new RuntimeException('В XML не найдено ни одного элемента расписания.');
        }

        $minDate=null;
        $maxDate=null;
        foreach ($data['patterns'] as $pattern) {
            $begin=$this->date($pattern['begin_date']);
            $end=$this->date($pattern['end_date']);
            if ($begin && (!$minDate || $begin->lt($minDate))) $minDate=$begin;
            if ($end && (!$maxDate || $end->gt($maxDate))) $maxDate=$end;
        }

        if (!$minDate || !$maxDate) {
            throw new RuntimeException('Не удалось определить период расписания из XML.');
        }

        return DB::transaction(function () use ($data,$mode,$minDate,$maxDate) {
            $groupMap=[];
            foreach ($data['classes'] as $classId=>$class) {
                $specialty=$data['specialities'][$class['speciality_id']] ?? null;
                $semester=(int)($class['semester'] ?? 0);
                $course=$semester>0 ? (int)ceil($semester/2) : null;

                $group=ScheduleGroup::updateOrCreate(
                    ['name'=>$class['name']],
                    [
                        'course'=>$course,
                        'specialty'=>$specialty,
                        'is_active'=>true,
                    ]
                );
                $groupMap[$classId]=$group->id;
            }

            $teacherMap=[];
            foreach ($data['teachers'] as $teacherId=>$teacher) {
                $name=trim($teacher['full_name']);
                if ($name==='') continue;

                $employee=Employee::firstOrCreate(
                    ['full_name'=>$name],
                    [
                        'employee_type'=>'teacher',
                        'position'=>null,
                        'sort'=>0,
                        'is_published'=>true,
                    ]
                );

                if ($employee->employee_type!=='teacher') {
                    $employee->update(['employee_type'=>'teacher']);
                }

                $teacherMap[$teacherId]=$employee->id;
            }

            $affectedGroupIds=[];

            if ($mode==='replace') {
                $importedGroupIds=array_values(array_unique($groupMap));
                $affectedGroupIds=$importedGroupIds;
                if ($importedGroupIds) {
                    ScheduleEntry::whereIn('group_id',$importedGroupIds)
                        ->whereBetween('lesson_date',[$minDate->format('Y-m-d'),$maxDate->format('Y-m-d')])
                        ->delete();
                }
            }

            $created=0;
            $updated=0;
            $unchanged=0;
            $skipped=0;

            foreach ($data['patterns'] as $pattern) {
                $load=$data['loads'][$pattern['load_id']] ?? null;
                if (!$load) {
                    $skipped++;
                    continue;
                }

                $groupDef=$load['groups'][$pattern['group_index']] ?? null;
                if (!$groupDef) {
                    $skipped++;
                    continue;
                }

                $subject=$data['subjects'][$groupDef['subject_id']] ?? null;
                if (!$subject) {
                    $skipped++;
                    continue;
                }

                $teacherId=$teacherMap[$groupDef['teacher_id']] ?? null;
                $studyType=$data['study_types'][$groupDef['study_type_id']] ?? null;

                $roomId=$pattern['room_id'];
                if ($roomId<0 && !empty($groupDef['room_ids'])) {
                    $roomId=$groupDef['room_ids'][0];
                }
                $room=$data['rooms'][$roomId] ?? null;

                $startSlot=$this->timeRange($data['times'],$pattern['min_hour']);
                $endSlot=$this->timeRange($data['times'],$pattern['max_hour']);
                if (!$startSlot || !$endSlot) {
                    $skipped++;
                    continue;
                }

                $startsAt=$startSlot[0];
                $endsAt=$endSlot[1];

                $begin=$this->date($pattern['begin_date']);
                $end=$this->date($pattern['end_date']);
                if (!$begin || !$end || $begin->gt($end)) {
                    $skipped++;
                    continue;
                }

                $subgroup=count($load['groups'])>1
                    ? 'Подгруппа '.($pattern['group_index']+1)
                    : null;

                foreach ($load['class_ids'] as $classId) {
                    $scheduleGroupId=$groupMap[$classId] ?? null;
                    if (!$scheduleGroupId) {
                        $skipped++;
                        continue;
                    }

                    foreach ($this->datesForPattern(
                        $begin,
                        $end,
                        $pattern['day'],
                        $groupDef['week_type'],
                        $data['term_begin']
                    ) as $lessonDate) {
                        $lookup=[
                            'lesson_date'=>$lessonDate->format('Y-m-d'),
                            'group_id'=>$scheduleGroupId,
                            'starts_at'=>$startsAt,
                            'subgroup'=>$subgroup,
                        ];

                        $entry=ScheduleEntry::firstOrNew($lookup);
                        $exists=$entry->exists;

                        $entry->fill([
                            'employee_id'=>$teacherId,
                            'lesson_number'=>$pattern['lesson_number'],
                            'ends_at'=>$endsAt,
                            'subject'=>$subject,
                            'room'=>$room,
                            'lesson_type'=>$studyType,
                            'notes'=>null,
                        ]);
                        $changed=!$exists || $entry->isDirty();
                        $entry->save();

                        if($changed){
                            $affectedGroupIds[]=$scheduleGroupId;
                            $exists ? $updated++ : $created++;
                        }else{
                            $unchanged++;
                        }
                    }
                }
            }

            return [
                'format'=>$data['format_name'],
                'format_version'=>$data['format_version'],
                'groups'=>count($groupMap),
                'group_ids'=>array_values(array_unique($affectedGroupIds)),
                'teachers'=>count($teacherMap),
                'created'=>$created,
                'updated'=>$updated,
                'unchanged'=>$unchanged,
                'skipped'=>$skipped,
                'period_from'=>$minDate->format('d.m.Y'),
                'period_to'=>$maxDate->format('d.m.Y'),
                'mode'=>$mode,
            ];
        });
    }

    private function parse(string $path): array
    {
        if (!is_file($path) || !is_readable($path)) {
            throw new RuntimeException('XML-файл недоступен для чтения.');
        }

        $reader=new XMLReader();
        if (!$reader->open($path,null,LIBXML_NONET|LIBXML_COMPACT|LIBXML_NOERROR|LIBXML_NOWARNING)) {
            throw new RuntimeException('Не удалось открыть XML-файл.');
        }

        $data=[
            'format_name'=>null,
            'format_version'=>null,
            'term_begin'=>null,
            'univer_system'=>false,
            'times'=>[],
            'classes'=>[],
            'subjects'=>[],
            'rooms'=>[],
            'teachers'=>[],
            'study_types'=>[],
            'specialities'=>[],
            'loads'=>[],
            'patterns'=>[],
        ];

        $section=null;
        $rootSeen=false;

        while ($reader->read()) {
            if ($reader->nodeType===XMLReader::ELEMENT) {
                if ($reader->depth===0 && $reader->name==='timetable') {
                    $rootSeen=true;
                    continue;
                }

                if ($reader->depth===1) {
                    $section=$reader->name;

                    if ($reader->name==='format') {
                        $data['format_name']=$reader->getAttribute('name');
                        $data['format_version']=$reader->getAttribute('version');
                    }

                    if ($reader->name==='term') {
                        $node=$this->xml($reader->readOuterXML());
                        $data['term_begin']=$this->string($node->begin_date ?? null);
                        $data['univer_system']=strtolower($this->string($node->univer_system ?? null))==='yes';
                        continue;
                    }

                    if ($reader->name==='times') {
                        $node=$this->xml($reader->readOuterXML());
                        $index=0;
                        foreach ($node->time as $time) {
                            $data['times'][$index++]=$this->string($time);
                        }
                        continue;
                    }
                }

                if ($section==='classes' && $reader->name==='class') {
                    $node=$this->xml($reader->readOuterXML());
                    $id=(int)$node->id;
                    $data['classes'][$id]=[
                        'name'=>$this->string($node->name),
                        'semester'=>(int)$node->semester,
                        'speciality_id'=>(int)$node->speciality_id,
                    ];
                    continue;
                }

                if ($section==='subjects' && $reader->name==='subject') {
                    $node=$this->xml($reader->readOuterXML());
                    $id=(int)$node->id;
                    $data['subjects'][$id]=$this->string($node->full_name) ?: $this->string($node->short_name);
                    continue;
                }

                if ($section==='rooms' && $reader->name==='room') {
                    $node=$this->xml($reader->readOuterXML());
                    $data['rooms'][(int)$node->id]=$this->string($node->name);
                    continue;
                }

                if ($section==='teachers' && $reader->name==='teacher') {
                    $node=$this->xml($reader->readOuterXML());
                    $person=$node->person;
                    $id=(int)$person->id;
                    $data['teachers'][$id]=[
                        'full_name'=>trim(implode(' ',array_filter([
                            $this->string($person->surname),
                            $this->string($person->first_name),
                            $this->string($person->second_name),
                        ]))),
                    ];
                    continue;
                }

                if ($section==='study_types' && $reader->name==='study_type') {
                    $node=$this->xml($reader->readOuterXML());
                    $data['study_types'][(int)$node->id]=$this->string($node->full_name) ?: $this->string($node->short_name);
                    continue;
                }

                if ($section==='specialities' && $reader->name==='speciality') {
                    $node=$this->xml($reader->readOuterXML());
                    $data['specialities'][(int)$node->id]=$this->string($node->full_name) ?: $this->string($node->short_name);
                    continue;
                }

                if ($section==='loads' && $reader->name==='load') {
                    $node=$this->xml($reader->readOuterXML());
                    $loadId=(int)$node->id;
                    $groups=[];

                    foreach ($node->groups->group as $groupNode) {
                        $roomIds=[];
                        if (isset($groupNode->room_id_list)) {
                            foreach ($groupNode->room_id_list->int as $roomNode) {
                                $roomIds[]=(int)$roomNode;
                            }
                        }

                        $groups[]=[
                            'teacher_id'=>(int)$groupNode->teacher_id,
                            'subject_id'=>(int)$groupNode->subject_id,
                            'study_type_id'=>(int)$groupNode->study_type_id,
                            'week_type'=>$this->string($groupNode->week_type) ?: 'any',
                            'pair_type'=>$this->string($groupNode->pair_type) ?: 'pkAny',
                            'room_ids'=>$roomIds,
                        ];
                    }

                    $classIds=[];
                    foreach ($node->klass_id_list->int as $classNode) {
                        $classIds[]=(int)$classNode;
                    }

                    $data['loads'][$loadId]=[
                        'groups'=>$groups,
                        'class_ids'=>$classIds,
                    ];
                    continue;
                }

                if ($section==='scheds' && $reader->name==='sched') {
                    $node=$this->xml($reader->readOuterXML());
                    $loadId=(int)$node->load_id;
                    $groupIndex=(int)$node->group;
                    $hour=(int)$node->hour;
                    $load=$data['loads'][$loadId] ?? null;
                    $groupDef=$load['groups'][$groupIndex] ?? null;

                    if (!$load || !$groupDef || $hour<1) {
                        continue;
                    }

                    $pairing=$data['univer_system'] && $groupDef['pair_type']!=='pkNo';
                    $lessonNumber=$pairing ? (int)ceil($hour/2) : $hour;
                    $slotKey=$pairing ? 'p'.$lessonNumber : 'h'.$hour;

                    $key=implode('|',[
                        $loadId,
                        $groupIndex,
                        (int)$node->day,
                        $slotKey,
                        (int)$node->room_id,
                        $this->string($node->begin_date),
                        $this->string($node->end_date),
                    ]);

                    if (!isset($data['patterns'][$key])) {
                        $data['patterns'][$key]=[
                            'load_id'=>$loadId,
                            'group_index'=>$groupIndex,
                            'day'=>(int)$node->day,
                            'room_id'=>(int)$node->room_id,
                            'begin_date'=>$this->string($node->begin_date),
                            'end_date'=>$this->string($node->end_date),
                            'lesson_number'=>$lessonNumber,
                            'min_hour'=>$hour,
                            'max_hour'=>$hour,
                        ];
                    } else {
                        $data['patterns'][$key]['min_hour']=min($data['patterns'][$key]['min_hour'],$hour);
                        $data['patterns'][$key]['max_hour']=max($data['patterns'][$key]['max_hour'],$hour);
                    }
                    continue;
                }
            }

            if ($reader->nodeType===XMLReader::END_ELEMENT && $reader->depth===1) {
                $section=null;
            }
        }

        $reader->close();

        if (!$rootSeen) {
            throw new RuntimeException('Файл не является расписанием семейства «Ректор»: отсутствует корневой элемент <timetable>.');
        }

        $supportedFormats=['Rector-College','Rector-University'];
        if ($data['format_name'] && !in_array($data['format_name'],$supportedFormats,true)) {
            throw new RuntimeException(
                'Неподдерживаемый формат расписания: '.$data['format_name'].
                '. Поддерживаются Rector-College и Rector-University.'
            );
        }

        $data['patterns']=array_values($data['patterns']);

        return $data;
    }

    private function xml(string $xml): SimpleXMLElement
    {
        $node=simplexml_load_string($xml,SimpleXMLElement::class,LIBXML_NONET|LIBXML_NOCDATA);
        if ($node===false) {
            throw new RuntimeException('Ошибка разбора XML расписания «Ректор».');
        }
        return $node;
    }

    private function string($value): string
    {
        return trim((string)$value);
    }

    private function date(?string $value): ?CarbonImmutable
    {
        if (!$value) return null;
        try {
            return CarbonImmutable::createFromFormat('d.m.Y',$value)->startOfDay();
        } catch (\Throwable $e) {
            return null;
        }
    }

    private function timeRange(array $times,int $hour): ?array
    {
        $value=$times[$hour] ?? null;
        if (!$value) return null;

        if (!preg_match('/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/u',$value,$m)) {
            return null;
        }

        return [$m[1],$m[2]];
    }

    private function datesForPattern(
        CarbonImmutable $begin,
        CarbonImmutable $end,
        int $day,
        string $weekType,
        ?string $termBegin
    ): array {
        if ($day<1 || $day>7) return [];

        $date=$begin;
        while ($date->isoWeekday()!==$day && $date->lte($end)) {
            $date=$date->addDay();
        }

        $termBase=$this->date($termBegin ?: $begin->format('d.m.Y'))?->startOfWeek() ?: $begin->startOfWeek();
        $dates=[];

        while ($date->lte($end)) {
            $weekNumber=(int)floor($termBase->diffInDays($date)/7)+1;
            $allowed=$weekType==='any'
                || ($weekType==='odd' && $weekNumber%2===1)
                || ($weekType==='even' && $weekNumber%2===0);

            if ($allowed) $dates[]=$date;
            $date=$date->addWeek();
        }

        return $dates;
    }
}
