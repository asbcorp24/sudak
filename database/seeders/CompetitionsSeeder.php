<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Competition;
use Illuminate\Database\Seeder;

class CompetitionsSeeder extends Seeder
{
    public function run(): void
    {
        $competitions = [
            [
                'key' => 'digital-shipyard',
                'title' => 'Инженерный конкурс «Цифровая верфь»',
                'organizer' => 'Зеленодольский судостроительный колледж',
                'starts_on' => now()->addDays(20)->toDateString(),
                'ends_on' => now()->addDays(22)->toDateString(),
                'location' => 'Зеленодольск, ул. Гастелло, 4',
                'description' => 'Командный инженерный конкурс по проектированию элементов судна, чтению чертежей, 3D-моделированию и технологической подготовке производства.',
                'url' => null,
                'is_published' => true,
            ],
            [
                'key' => 'shipbuilding-pro',
                'title' => 'Конкурс профессионального мастерства «Судостроение: от чертежа до корпуса»',
                'organizer' => 'Зеленодольский судостроительный колледж',
                'starts_on' => now()->addDays(45)->toDateString(),
                'ends_on' => now()->addDays(45)->toDateString(),
                'location' => 'Учебно-производственные мастерские колледжа',
                'description' => 'Практические задания по судостроительным конструкциям, технологической последовательности сборки, контролю геометрии и работе с технической документацией.',
                'url' => null,
                'is_published' => true,
            ],
            [
                'key' => 'cnc-engineering',
                'title' => 'Технологический марафон CNC и машиностроения',
                'organizer' => 'Зеленодольский судостроительный колледж',
                'starts_on' => now()->addDays(65)->toDateString(),
                'ends_on' => now()->addDays(66)->toDateString(),
                'location' => 'Лаборатория машиностроения',
                'description' => 'Соревнование по построению технологического процесса, выбору инструмента, подготовке управляющей программы и контролю изготовленной детали.',
                'url' => null,
                'is_published' => true,
            ],
            [
                'key' => 'network-admin',
                'title' => 'IT-чемпионат по сетевому и системному администрированию',
                'organizer' => 'Зеленодольский судостроительный колледж',
                'starts_on' => now()->addDays(90)->toDateString(),
                'ends_on' => now()->addDays(90)->toDateString(),
                'location' => 'IT-лаборатория колледжа',
                'description' => 'Настройка сетевой инфраструктуры, серверных служб, диагностика неисправностей и практические задания по системному администрированию.',
                'url' => null,
                'is_published' => true,
            ],
        ];

        $created = [];

        foreach ($competitions as $item) {
            $key = $item['key'];
            unset($item['key']);

            $competition = Competition::updateOrCreate(
                ['title' => $item['title']],
                $item
            );

            $created[$key] = $competition;
        }

        $achievements = [
            [
                'competition_id' => $created['digital-shipyard']->id,
                'student_name' => 'Команда ЗСК',
                'title' => 'Лучший инженерный проект',
                'result' => 'I место',
                'level' => 'внутриколледжный',
                'awarded_at' => now()->subMonths(2)->toDateString(),
                'description' => 'Проект цифровой модели судового корпуса с визуализацией основных конструктивных элементов.',
                'is_public' => true,
            ],
            [
                'competition_id' => $created['cnc-engineering']->id,
                'student_name' => 'Команда направления «Технология машиностроения»',
                'title' => 'Технологическая подготовка производства',
                'result' => 'Призовое место',
                'level' => 'внутриколледжный',
                'awarded_at' => now()->subMonths(1)->toDateString(),
                'description' => 'Практическая работа по разработке технологического процесса изготовления детали и контролю качества.',
                'is_public' => true,
            ],
            [
                'competition_id' => $created['network-admin']->id,
                'student_name' => 'Команда направления «Сетевое и системное администрирование»',
                'title' => 'Лучшее решение инфраструктурной задачи',
                'result' => 'Диплом',
                'level' => 'внутриколледжный',
                'awarded_at' => now()->subWeeks(3)->toDateString(),
                'description' => 'Развёртывание и диагностика учебной серверной инфраструктуры с разграничением доступа и сетевыми сервисами.',
                'is_public' => true,
            ],
        ];

        foreach ($achievements as $item) {
            Achievement::updateOrCreate(
                [
                    'title' => $item['title'],
                    'student_name' => $item['student_name'],
                ],
                $item
            );
        }
    }
}
