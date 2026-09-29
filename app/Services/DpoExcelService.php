<?php
namespace App\Services;

use RuntimeException;
use ZipArchive;

class DpoExcelService
{
    public function read(string $path,string $extension): array
    {
        $extension=strtolower($extension);
        if(in_array($extension,['csv','txt'],true)) return $this->readCsv($path);
        if($extension==='xlsx') return $this->readXlsx($path);
        throw new RuntimeException('Поддерживаются файлы XLSX и CSV.');
    }

    private function readCsv(string $path): array
    {
        $raw=file_get_contents($path);
        if($raw===false) throw new RuntimeException('Не удалось прочитать файл.');
        if(!mb_check_encoding($raw,'UTF-8')) $raw=mb_convert_encoding($raw,'UTF-8','Windows-1251,ISO-8859-1');
        $delimiter=substr_count(strtok($raw,"\n"),';')>=substr_count(strtok($raw,"\n"),',')?';':',';
        $handle=fopen('php://temp','r+'); fwrite($handle,$raw); rewind($handle);
        $rows=[];
        while(($row=fgetcsv($handle,0,$delimiter))!==false) $rows[]=$row;
        fclose($handle);
        return $this->normalizeRows($rows);
    }

    private function readXlsx(string $path): array
    {
        if(!class_exists(ZipArchive::class)) throw new RuntimeException('Для XLSX требуется PHP-расширение zip.');
        if(!class_exists(\DOMDocument::class)) throw new RuntimeException('Для XLSX требуется PHP-расширение dom/xml.');

        $zip=new ZipArchive();
        if($zip->open($path)!==true) throw new RuntimeException('Не удалось открыть XLSX.');

        $shared=[];
        $sharedXml=$zip->getFromName('xl/sharedStrings.xml');
        if($sharedXml){
            $dom=new \DOMDocument();
            if(@$dom->loadXML($sharedXml)){
                $xp=new \DOMXPath($dom);
                foreach($xp->query('//*[local-name()="si"]') as $si){
                    $parts=[];
                    foreach($xp->query('.//*[local-name()="t"]',$si) as $text) $parts[]=$text->textContent;
                    $shared[]=implode('',$parts);
                }
            }
        }

        $sheetXml=$zip->getFromName('xl/worksheets/sheet1.xml');
        if(!$sheetXml){$zip->close(); throw new RuntimeException('В XLSX не найден первый лист.');}

        $dom=new \DOMDocument();
        if(!@$dom->loadXML($sheetXml)){ $zip->close(); throw new RuntimeException('Не удалось прочитать XML первого листа.'); }
        $xp=new \DOMXPath($dom);
        $rows=[];

        foreach($xp->query('//*[local-name()="sheetData"]/*[local-name()="row"]') as $row){
            $cells=[];
            foreach($xp->query('./*[local-name()="c"]',$row) as $cell){
                $ref=$cell->attributes?->getNamedItem('r')?->nodeValue ?: 'A';
                preg_match('/^[A-Z]+/',$ref,$m);
                $column=$this->columnIndex($m[0]??'A');
                $type=$cell->attributes?->getNamedItem('t')?->nodeValue ?: '';
                $value='';
                if($type==='inlineStr'){
                    $parts=[];
                    foreach($xp->query('.//*[local-name()="t"]',$cell) as $text) $parts[]=$text->textContent;
                    $value=implode('',$parts);
                }else{
                    $valueNode=$xp->query('./*[local-name()="v"]',$cell)->item(0);
                    $value=$valueNode?->textContent ?? '';
                    if($type==='s') $value=$shared[(int)$value]??'';
                }
                $cells[$column]=$value;
            }
            if($cells){
                $max=max(array_keys($cells));
                $line=[];
                for($i=0;$i<=$max;$i++) $line[]=$cells[$i]??'';
                $rows[]=$line;
            }
        }

        $zip->close();
        return $this->normalizeRows($rows);
    }

    private function columnIndex(string $letters): int
    {
        $n=0;
        foreach(str_split($letters) as $letter) $n=$n*26+(ord($letter)-64);
        return max(0,$n-1);
    }

    private function normalizeRows(array $rows): array
    {
        $rows=array_values(array_filter($rows,fn($row)=>count(array_filter($row,fn($v)=>trim((string)$v)!==''))));
        if(!$rows) return [];
        $headers=array_map(fn($v)=>$this->header((string)$v),array_shift($rows));
        $result=[];
        foreach($rows as $row){
            $item=[];
            foreach($headers as $i=>$header) if($header!=='') $item[$header]=trim((string)($row[$i]??''));
            if(trim((string)($item['name']??''))!=='') $result[]=$item;
        }
        return $result;
    }

    private function header(string $value): string
    {
        $v=mb_strtolower(trim($value));
        $v=str_replace(['ё','.',':'],'е',$v);
        return match(true){
            in_array($v,['фио','ф и о','слушатель','имя','name'],true)=>'name',
            in_array($v,['email','e-mail','почта','логин'],true)=>'email',
            in_array($v,['телефон','phone'],true)=>'phone',
            in_array($v,['организация','место работы','organization'],true)=>'organization',
            in_array($v,['должность','position'],true)=>'position',
            in_array($v,['группа','group','учебная группа'],true)=>'group',
            in_array($v,['пароль','password'],true)=>'password',
            default=>'',
        };
    }

    public function spreadsheetXml(string $title,array $headers,array $rows): string
    {
        $esc=fn($v)=>htmlspecialchars((string)$v,ENT_XML1|ENT_QUOTES,'UTF-8');
        $xml='<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>';
        $xml.='<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="'.$esc(mb_substr($title,0,31)).'"><Table>';
        $xml.='<Row>';
        foreach($headers as $header) $xml.='<Cell><Data ss:Type="String">'.$esc($header).'</Data></Cell>';
        $xml.='</Row>';
        foreach($rows as $row){
            $xml.='<Row>';
            foreach($row as $value){
                $type=is_numeric($value) && $value!==''?'Number':'String';
                $xml.='<Cell><Data ss:Type="'.$type.'">'.$esc($value).'</Data></Cell>';
            }
            $xml.='</Row>';
        }
        return $xml.'</Table></Worksheet></Workbook>';
    }
}
