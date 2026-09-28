<?php

namespace Database\Seeders;

use App\Models\OfficialDocumentCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OfficialDocumentCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories=[
            ['title'=>'Учредительные документы','sort'=>10],
            ['title'=>'Лицензия и государственная аккредитация','sort'=>20],
            ['title'=>'Локальные нормативные акты','sort'=>30],
            ['title'=>'Образовательные программы и учебные планы','sort'=>40],
            ['title'=>'Документы о приёме и переводе обучающихся','sort'=>50],
            ['title'=>'Платные образовательные услуги','sort'=>60],
            ['title'=>'Финансово-хозяйственная деятельность','sort'=>70],
            ['title'=>'Доступная среда и условия обучения','sort'=>80],
        ];

        foreach($categories as $item){
            OfficialDocumentCategory::updateOrCreate(
                ['slug'=>Str::slug($item['title'])],
                [
                    'title'=>$item['title'],
                    'description'=>null,
                    'sort'=>$item['sort'],
                    'is_published'=>true,
                ]
            );
        }
    }
}
