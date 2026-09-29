<?php

namespace Database\Seeders;

use App\Models\OfficialDocumentCategory;
use Illuminate\Database\Seeder;

class OfficialDocumentCategorySeeder extends Seeder
{
    public function run(): void
    {
        $items=[
            ['title'=>'Локальные нормативные акты','slug'=>'local-acts','sort'=>10],
            ['title'=>'Лицензии и аккредитация','slug'=>'licenses-accreditation','sort'=>20],
            ['title'=>'Образовательные документы','slug'=>'education','sort'=>30],
            ['title'=>'Приказы','slug'=>'orders','sort'=>40],
            ['title'=>'Положения','slug'=>'regulations','sort'=>50],
            ['title'=>'Учредительные документы','slug'=>'founding-documents','sort'=>60],
            ['title'=>'Финансово-хозяйственная деятельность','slug'=>'finance','sort'=>70],
            ['title'=>'Иные документы','slug'=>'other','sort'=>90],
        ];

        foreach($items as $item){
            OfficialDocumentCategory::firstOrCreate(
                ['slug'=>$item['slug']],
                $item+['description'=>null,'is_published'=>true]
            );
        }
    }
}
