<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\Page;
use App\Models\Specialty;
use App\Models\NewsPost;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
 public function run()
 {
  $adminPassword=env('ADMIN_PASSWORD');
  if(!$adminPassword){
   throw new \RuntimeException('Set ADMIN_PASSWORD in .env before running php artisan db:seed');
  }

  User::updateOrCreate(
   ['email'=>env('ADMIN_EMAIL','admin@zsk.local')],
   ['name'=>'Администратор','password'=>Hash::make($adminPassword),'is_admin'=>true,'admin_scope'=>'full']
  );

  foreach([
   ['director','Резатдинов Эдуард Фаргатович'],
   ['address','422542, Республика Татарстан, г. Зеленодольск, ул. Гастелло, д. 4'],
   ['phone','+7 (843) 714-26-17; +7 (843) 714-24-97'],
   ['email','GAPOU.ZSK@tatar.ru'],
   ['students','519'],
   ['teachers','34']
  ] as [$k,$v]) Setting::updateOrCreate(['key'=>$k],['value'=>$v]);

  $about=Page::updateOrCreate(['slug'=>'college'],[
   'title'=>'Колледж','menu_title'=>'Колледж','page_type'=>'section',
   'excerpt'=>'Зеленодольский судостроительный колледж: образование, технологии и индустрия.',
   'content'=>'<h2>ГАПОУ «Зеленодольский судостроительный колледж»</h2><p>Профессиональная образовательная организация Республики Татарстан, ориентированная на подготовку специалистов для судостроения, машиностроения, цифровой и электротехнической отраслей.</p>',
   'sort'=>10
  ]);
  foreach([
   ['history','История и миссия','Колледж соединяет инженерную школу Зеленодольска с современными цифровыми технологиями и практико-ориентированным СПО.'],
   ['leadership','Руководство','Директор: Резатдинов Эдуард Фаргатович.'],
   ['partners','Индустриальные партнёры','Практика и дипломные проекты студентов связаны с предприятиями судостроительного и машиностроительного профиля Зеленодольска.']
  ] as [$slug,$title,$text]) Page::updateOrCreate(['slug'=>$slug],[
   'parent_id'=>$about->id,'title'=>$title,'page_type'=>'subsection','content'=>'<p>'.$text.'</p>','sort'=>10
  ]);

  $edu=Page::updateOrCreate(['slug'=>'education'],[
   'title'=>'Образование','menu_title'=>'Образование','page_type'=>'section',
   'excerpt'=>'Специальности, образовательные программы, практика и демонстрационный экзамен.',
   'content'=>'<h2>Образовательные программы</h2><p>Колледж реализует программы среднего профессионального образования технического и цифрового профиля.</p>',
   'sort'=>20
  ]);
  foreach([
   ['programs','Образовательные программы'],
   ['practice','Практика и трудоустройство'],
   ['demo-exam','Демонстрационный экзамен']
  ] as [$slug,$title]) Page::updateOrCreate(['slug'=>$slug],[
   'parent_id'=>$edu->id,'title'=>$title,'page_type'=>'subsection',
   'content'=>'<p>Раздел наполняется документами и актуальными материалами колледжа.</p>','sort'=>10
  ]);

  $app=Page::updateOrCreate(['slug'=>'applicant'],[
   'title'=>'Абитуриенту','menu_title'=>'Абитуриенту','page_type'=>'section',
   'excerpt'=>'Приёмная кампания, документы, специальности и контакты приёмной комиссии.',
   'content'=>'<h2>Приёмная комиссия</h2><p>Здесь размещаются правила приёма, сроки, перечень документов, контрольные цифры приёма и ответы на частые вопросы.</p>',
   'sort'=>30
  ]);
  foreach([
   ['admission-2026','Приёмная кампания 2026–2027'],
   ['documents-applicant','Документы для поступления'],
   ['open-days','Дни открытых дверей'],
   ['faq-applicant','Вопросы и ответы']
  ] as [$slug,$title]) Page::updateOrCreate(['slug'=>$slug],[
   'parent_id'=>$app->id,'title'=>$title,'page_type'=>'subsection',
   'content'=>'<p>Актуальная информация публикуется приёмной комиссией.</p>','sort'=>10
  ]);

  $student=Page::updateOrCreate(['slug'=>'student'],[
   'title'=>'Студенту','menu_title'=>'Студенту','page_type'=>'section',
   'excerpt'=>'Расписание, стипендии, общежитие, студенческая жизнь и поддержка.',
   'content'=>'<h2>Цифровой раздел студента</h2><p>Учебные сервисы, документы и возможности студенческой жизни собраны в одном месте.</p>',
   'sort'=>40
  ]);
  foreach([
   ['schedule','Расписание'],
   ['scholarships','Стипендии и меры поддержки'],
   ['student-life','Студенческая жизнь'],
   ['career','Карьера и трудоустройство']
  ] as [$slug,$title]) Page::updateOrCreate(['slug'=>$slug],[
   'parent_id'=>$student->id,'title'=>$title,'page_type'=>'subsection',
   'content'=>'<p>Материалы раздела обновляются администрацией колледжа.</p>','sort'=>10
  ]);

  $info=Page::updateOrCreate(['slug'=>'sveden'],[
   'title'=>'Сведения об образовательной организации','menu_title'=>'Сведения об организации',
   'page_type'=>'section','excerpt'=>'Официальная информация и документы образовательной организации.',
   'content'=>'<h2>Сведения об образовательной организации</h2><p>Структурированный официальный раздел колледжа.</p>',
   'sort'=>90
  ]);
  $items=[
   'basic'=>'Основные сведения',
   'structure'=>'Структура и органы управления',
   'documents'=>'Документы',
   'education-info'=>'Образование',
   'management'=>'Руководство',
   'teachers'=>'Педагогический состав',
   'facilities'=>'Материально-техническое обеспечение',
   'paid-services'=>'Платные образовательные услуги',
   'finance'=>'Финансово-хозяйственная деятельность',
   'vacancies'=>'Вакантные места для приёма',
   'scholarships-info'=>'Стипендии и меры поддержки',
   'accessible'=>'Доступная среда',
   'international'=>'Международное сотрудничество',
   'food'=>'Организация питания'
  ];
  $n=0;
  foreach($items as $slug=>$title) Page::updateOrCreate(['slug'=>$slug],[
   'parent_id'=>$info->id,'title'=>$title,'page_type'=>'subsection',
   'content'=>'<p>Официальные документы и сведения размещаются администрацией колледжа.</p>',
   'sort'=>$n+=10
  ]);

  $specs=[
   ['26.02.02','Судостроение','sudostroenie','3 года 10 месяцев','техник','на базе 9 классов','Проектирование, технология постройки и контроль судостроительного производства.','shipbuilding','#49d9ff',10],
   ['26.02.04','Монтаж и техническое обслуживание судовых машин и механизмов','sudovye-mashiny','3 года 10 месяцев','техник','на базе 9 классов','Монтаж, эксплуатация и техническое обслуживание энергетических установок и судовых механизмов.','engine','#ffb547',20],
   ['13.02.13','Эксплуатация и обслуживание электрического и электромеханического оборудования (по отраслям)','electro','3 года 10 месяцев','техник','на базе 9 классов','Электрооборудование, автоматика, диагностика и техническое обслуживание электромеханических систем.','electro','#7dffbd',30],
   ['09.02.06','Сетевое и системное администрирование','networks','3 года 10 месяцев','системный администратор','на базе 9 классов','Серверы, сети, виртуализация, информационная инфраструктура и системное администрирование.','network','#9e8cff',40],
   ['15.02.16','Технология машиностроения','mashinostroenie','3 года 10 месяцев','техник-технолог','на базе 9 классов','Проектирование технологических процессов, обработка деталей, цифровое производство и CNC.','cnc','#ff6b91',50],
   ['27.02.07','Управление качеством продукции, процессов и услуг (по отраслям)','quality','2 года 10 месяцев','техник','на базе 9 классов','Измерения, контроль, анализ процессов и управление качеством промышленной продукции.','quality','#56f0d2',60]
  ];
  foreach($specs as [$code,$title,$slug,$duration,$qual,$basis,$desc,$scene,$accent,$sort]) {
   Specialty::updateOrCreate(['code'=>$code],[
    'title'=>$title,'slug'=>$slug,'duration'=>$duration,'qualification'=>$qual,
    'admission_basis'=>$basis,'description'=>$desc,
    'details'=>'<p>Программа сочетает фундаментальную техническую подготовку, практические занятия, производственную практику и работу с современными цифровыми инструментами.</p>',
    'scene_key'=>$scene,'accent'=>$accent,
    'scene_config'=>['particles'=>true,'autoRotate'=>true],
    'sort'=>$sort,'is_published'=>true
   ]);
  }

  NewsPost::updateOrCreate(['slug'=>'new-digital-site'],[
   'title'=>'Новый цифровой портал Зеленодольского судостроительного колледжа',
   'excerpt'=>'Единая технологичная площадка для абитуриентов, студентов, преподавателей и партнёров.',
   'content'=>'<p>Портал построен как развиваемая цифровая платформа: специальности получили интерактивные 3D-сцены, а все информационные разделы управляются через CMS.</p>',
   'published_at'=>now(),'is_published'=>true
  ]);

  $this->call([
   CompetitionsSeeder::class,
   QuizzesSeeder::class,
   OfficialDocumentCategoriesSeeder::class,
   DpoProgramsSeeder::class,
   DpoDigitalProgramsSeeder::class,
  ]);
 }
}
