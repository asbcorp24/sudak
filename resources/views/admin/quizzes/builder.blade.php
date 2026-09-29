@extends('admin.layout')
@section('heading','Конструктор викторины')
@section('content')
<style>
.quiz-builder{--qb-blue:#1769d2;--qb-dark:#0b3f86;--qb-line:#dbe8f7;--qb-bg:#f4f8fd;color:#16324f}
.quiz-builder .qb-top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}
.quiz-builder .qb-top-actions{display:flex;gap:8px;flex-wrap:wrap}
.quiz-builder .qb-btn{border:1px solid var(--qb-line);background:#fff;color:var(--qb-dark);border-radius:12px;padding:9px 14px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:7px;cursor:pointer}
.quiz-builder .qb-btn:hover{border-color:#9fc5f5;background:#f7fbff;color:var(--qb-blue)}
.quiz-builder .qb-btn.primary{background:var(--qb-blue);border-color:var(--qb-blue);color:#fff}
.quiz-builder .qb-btn.danger{color:#b42318}
.quiz-builder .qb-shell{display:grid;grid-template-columns:310px minmax(0,1fr);gap:18px;align-items:start}
.quiz-builder .qb-panel{background:#fff;border:1px solid var(--qb-line);border-radius:18px;box-shadow:0 12px 34px rgba(25,73,122,.07);overflow:hidden}
.quiz-builder .qb-sidebar{position:sticky;top:18px}
.quiz-builder .qb-panel-head{padding:16px 18px;border-bottom:1px solid var(--qb-line);display:flex;justify-content:space-between;align-items:center;gap:10px}
.quiz-builder .qb-panel-head h3{font-size:16px;margin:0;color:var(--qb-dark)}
.quiz-builder .qb-count{font-size:12px;background:#eaf3ff;color:var(--qb-blue);padding:5px 9px;border-radius:999px;font-weight:800}
.quiz-builder .qb-question-list{padding:10px;max-height:calc(100vh - 270px);overflow:auto}
.quiz-builder .qb-question-item{display:grid;grid-template-columns:34px minmax(0,1fr) 24px;gap:8px;align-items:center;padding:10px;border:1px solid transparent;border-radius:12px;cursor:pointer;margin-bottom:5px;background:#fff}
.quiz-builder .qb-question-item:hover{background:#f5f9ff}
.quiz-builder .qb-question-item.active{background:#edf5ff;border-color:#a9cffb}
.quiz-builder .qb-question-item.dragging{opacity:.45}
.quiz-builder .qb-num{width:30px;height:30px;border-radius:9px;background:#eaf3ff;color:var(--qb-blue);display:grid;place-items:center;font-weight:900;font-size:12px}
.quiz-builder .qb-question-item.active .qb-num{background:var(--qb-blue);color:#fff}
.quiz-builder .qb-qtext{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.quiz-builder .qb-grip{color:#8aa2bc;font-size:18px;cursor:grab}
.quiz-builder .qb-add{margin:0 10px 12px;width:calc(100% - 20px);justify-content:center}
.quiz-builder .qb-main{padding:20px}
.quiz-builder .qb-settings{display:grid;grid-template-columns:minmax(0,1fr) 160px;gap:14px;margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid var(--qb-line)}
.quiz-builder label.qb-label{display:block;font-size:12px;font-weight:800;color:#59738e;margin:0 0 6px;text-transform:uppercase;letter-spacing:.04em}
.quiz-builder .form-control,.quiz-builder .form-select{background:#fff!important;color:#16324f!important;border:1px solid #cddff2!important;border-radius:11px!important}
.quiz-builder .form-control:focus,.quiz-builder .form-select:focus{border-color:#6ba9ed!important;box-shadow:0 0 0 3px rgba(23,105,210,.10)!important}
.quiz-builder .qb-description{margin-bottom:18px}
.quiz-builder .qb-editor-head{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:14px}
.quiz-builder .qb-editor-head h2{font-size:20px;color:var(--qb-dark);margin:0}
.quiz-builder .qb-editor-actions{display:flex;gap:6px}
.quiz-builder .qb-icon-btn{width:36px;height:36px;border:1px solid var(--qb-line);border-radius:10px;background:#fff;color:#59738e;cursor:pointer;font-weight:900}
.quiz-builder .qb-icon-btn:hover{background:#f1f7ff;color:var(--qb-blue)}
.quiz-builder .qb-icon-btn.danger:hover{background:#fff2f0;color:#b42318;border-color:#ffc9c2}
.quiz-builder .qb-question-text{font-size:17px;font-weight:700;min-height:86px}
.quiz-builder .qb-options-title{display:flex;justify-content:space-between;align-items:end;gap:10px;margin:18px 0 10px}
.quiz-builder .qb-options-title h3{font-size:15px;margin:0;color:var(--qb-dark)}
.quiz-builder .qb-options-title small{color:#7089a3}
.quiz-builder .qb-option{display:grid;grid-template-columns:42px 34px minmax(0,1fr) 36px;gap:9px;align-items:center;border:1px solid var(--qb-line);border-radius:13px;padding:9px 10px;margin-bottom:8px;background:#fbfdff}
.quiz-builder .qb-option.correct{border-color:#83c99b;background:#f3fbf5}
.quiz-builder .qb-letter{width:34px;height:34px;border-radius:9px;background:#eaf3ff;color:var(--qb-blue);display:grid;place-items:center;font-weight:900}
.quiz-builder .qb-correct{appearance:none;width:22px;height:22px;border:2px solid #a8bdd3;border-radius:50%;display:grid;place-items:center;cursor:pointer;margin:auto}
.quiz-builder .qb-correct:checked{border-color:#168447;background:#168447;box-shadow:inset 0 0 0 5px #fff}
.quiz-builder .qb-option input[type=text]{height:42px}
.quiz-builder .qb-add-option{margin-top:10px}
.quiz-builder .qb-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;border-top:1px solid var(--qb-line);margin-top:22px;padding-top:18px}
.quiz-builder .qb-publish{display:flex;align-items:center;gap:10px;font-weight:700}
.quiz-builder .qb-publish input{width:42px;height:22px}
.quiz-builder .qb-help{background:#f1f7ff;border:1px solid #d5e8ff;border-radius:13px;padding:12px 14px;font-size:13px;color:#496783;margin-bottom:18px}
.quiz-builder .qb-results{margin-top:18px}
.quiz-builder .qb-results .table{margin:0;color:#284866}
.quiz-builder .qb-results th{font-size:11px;text-transform:uppercase;color:#7089a3}
.quiz-builder .qb-empty{padding:24px;text-align:center;color:#7089a3}
@media(max-width:900px){.quiz-builder .qb-shell{grid-template-columns:1fr}.quiz-builder .qb-sidebar{position:static}.quiz-builder .qb-question-list{max-height:280px}.quiz-builder .qb-settings{grid-template-columns:1fr}.quiz-builder .qb-top{align-items:flex-start;flex-direction:column}}
@media(max-width:560px){.quiz-builder .qb-main{padding:14px}.quiz-builder .qb-option{grid-template-columns:34px 28px minmax(0,1fr) 32px}.quiz-builder .qb-footer{align-items:stretch;flex-direction:column}.quiz-builder .qb-footer .qb-btn{justify-content:center}}
</style>

<div class="quiz-builder">
 @if($errors->any())
  <div class="alert alert-danger mb-3">@foreach($errors->all() as $error)<div>{{ $error }}</div>@endforeach</div>
 @endif

 <div class="qb-top">
  <div>
   <a href="{{ route('admin.quizzes.index') }}" class="text-decoration-none">← Все викторины</a>
   <div class="text-secondary small mt-1">Вопросов: <b id="topQuestionCount">{{ count($quiz->questions_json??[]) }}</b> · попыток: <b>{{ $quiz->attempts_count }}</b></div>
  </div>
  <div class="qb-top-actions">
   @if($quiz->is_published)<a class="qb-btn" target="_blank" href="{{ route('quizzes.show',$quiz) }}">Предпросмотр ↗</a>@endif
   <button class="qb-btn" type="submit" form="duplicateQuizForm">⧉ Дублировать</button>
   <button class="qb-btn primary" type="submit" form="quizBuilderForm">Сохранить</button>
  </div>
 </div>

 <form id="quizBuilderForm" method="post" action="{{ route('admin.quizzes.update',$quiz) }}">
  @csrf @method('PUT')
  <input type="hidden" name="questions_json" id="questionsJson">

  <div class="qb-shell">
   <aside class="qb-panel qb-sidebar">
    <div class="qb-panel-head"><h3>Вопросы</h3><span class="qb-count" id="questionCount">0</span></div>
    <div class="qb-question-list" id="questionList"></div>
    <button type="button" class="qb-btn qb-add" id="addQuestion">＋ Добавить вопрос</button>
   </aside>

   <main class="qb-panel qb-main">
    <div class="qb-settings">
     <div>
      <label class="qb-label" for="quizTitle">Название викторины</label>
      <input id="quizTitle" class="form-control" name="title" value="{{ old('title',$quiz->title) }}" required maxlength="220">
     </div>
     <div>
      <label class="qb-label" for="passScore">Проходной балл</label>
      <div class="input-group"><input id="passScore" type="number" min="1" max="100" class="form-control" name="pass_score" value="{{ old('pass_score',$quiz->pass_score) }}" required><span class="input-group-text">%</span></div>
     </div>
    </div>

    <div class="qb-description">
     <label class="qb-label" for="quizDescription">Описание</label>
     <textarea id="quizDescription" class="form-control" rows="2" name="description" placeholder="Коротко расскажите участнику, о чём эта викторина">{{ old('description',$quiz->description) }}</textarea>
    </div>

    <div class="qb-help">Для каждого вопроса выберите один правильный ответ зелёным переключателем. Порядок вопросов можно менять перетаскиванием в списке слева или стрелками.</div>

    <section id="questionEditor">
     <div class="qb-editor-head">
      <h2 id="questionHeading">Вопрос</h2>
      <div class="qb-editor-actions">
       <button type="button" class="qb-icon-btn" id="moveQuestionUp" title="Выше">↑</button>
       <button type="button" class="qb-icon-btn" id="moveQuestionDown" title="Ниже">↓</button>
       <button type="button" class="qb-icon-btn" id="duplicateQuestion" title="Дублировать">⧉</button>
       <button type="button" class="qb-icon-btn danger" id="deleteQuestion" title="Удалить">×</button>
      </div>
     </div>
     <label class="qb-label" for="questionText">Текст вопроса</label>
     <textarea id="questionText" class="form-control qb-question-text" rows="3" placeholder="Введите вопрос"></textarea>

     <div class="qb-options-title">
      <div><h3>Варианты ответов</h3><small>Минимум два варианта</small></div>
      <small>● правильный ответ</small>
     </div>
     <div id="optionList"></div>
     <button type="button" class="qb-btn qb-add-option" id="addOption">＋ Добавить вариант</button>
    </section>

    <div class="qb-footer">
     <label class="qb-publish"><input class="form-check-input" type="checkbox" name="is_published" value="1" @checked(old('is_published',$quiz->is_published))> Опубликовать викторину</label>
     <button class="qb-btn primary" type="submit">Сохранить изменения</button>
    </div>
   </main>
  </div>
 </form>

 <form id="duplicateQuizForm" method="post" action="{{ route('admin.quizzes.duplicate',$quiz) }}" class="d-none">@csrf</form>
 <form id="deleteQuizForm" method="post" action="{{ route('admin.quizzes.destroy',$quiz) }}" class="d-none">@csrf @method('DELETE')</form>

 <div class="qb-panel qb-results">
  <div class="qb-panel-head">
   <h3>Последние результаты</h3>
   <button type="submit" form="deleteQuizForm" class="qb-btn danger" onclick="return confirm('Удалить викторину вместе со всеми результатами?')">Удалить викторину</button>
  </div>
  @if($recentAttempts->count())
   <div class="table-responsive">
    <table class="table align-middle">
     <thead><tr><th>Дата</th><th>Участник</th><th>Результат</th><th>Статус</th><th>Сертификат</th></tr></thead>
     <tbody>
      @foreach($recentAttempts as $attempt)
       <tr>
        <td>{{ optional($attempt->completed_at)->format('d.m.Y H:i') }}</td>
        <td><b>{{ $attempt->participant_name }}</b>@if($attempt->participant_email)<br><small>{{ $attempt->participant_email }}</small>@endif</td>
        <td><b>{{ $attempt->score }}%</b></td>
        <td>{{ $attempt->passed?'Пройдено':'Не пройдено' }}</td>
        <td>@if($attempt->certificate_code)<a target="_blank" href="{{ route('quizzes.certificate',$attempt->certificate_code) }}">{{ $attempt->certificate_code }}</a>@else—@endif</td>
       </tr>
      @endforeach
     </tbody>
    </table>
   </div>
  @else
   <div class="qb-empty">Эту викторину ещё не проходили.</div>
  @endif
 </div>
</div>

<script>
(()=>{
 const raw=@json($quiz->questions_json ?? []);
 const letters='abcdefghijklmnopqrstuvwxyz'.split('');
 const state={
  active:0,
  questions:(Array.isArray(raw)?raw:[]).map(q=>{
   const entries=Object.entries(q.options||{});
   const correctIndex=Math.max(0,entries.findIndex(([key])=>String(key)===String(q.correct)));
   return {
    question:String(q.question||''),
    options:entries.map(([,label])=>String(label||'')),
    correct:correctIndex
   };
  })
 };
 if(!state.questions.length) state.questions=[{question:'Новый вопрос',options:['Вариант ответа 1','Вариант ответа 2'],correct:0}];

 const list=document.getElementById('questionList');
 const optionList=document.getElementById('optionList');
 const questionText=document.getElementById('questionText');
 const heading=document.getElementById('questionHeading');
 const count=document.getElementById('questionCount');
 const topCount=document.getElementById('topQuestionCount');
 const hidden=document.getElementById('questionsJson');
 let dragIndex=null;

 const current=()=>state.questions[state.active];

 function esc(value){
  return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
 }

 function serialize(){
  return state.questions.map(q=>{
   const options={};
   q.options.forEach((label,i)=>options[letters[i]||('o'+i)]=label);
   return {question:q.question,options,correct:letters[q.correct]||('o'+q.correct)};
  });
 }

 function sync(){
  hidden.value=JSON.stringify(serialize());
  count.textContent=state.questions.length;
  topCount.textContent=state.questions.length;
 }

 function renderList(){
  list.innerHTML=state.questions.map((q,i)=>`
   <div class="qb-question-item ${i===state.active?'active':''}" draggable="true" data-index="${i}">
    <span class="qb-num">${String(i+1).padStart(2,'0')}</span>
    <span class="qb-qtext">${esc(q.question||'Без текста')}</span>
    <span class="qb-grip" title="Перетащить">⋮⋮</span>
   </div>`).join('');
  sync();
 }

 function renderEditor(){
  const q=current();
  if(!q)return;
  heading.textContent='Вопрос '+(state.active+1);
  questionText.value=q.question;
  optionList.innerHTML=q.options.map((label,i)=>`
   <div class="qb-option ${q.correct===i?'correct':''}" data-option="${i}">
    <span class="qb-letter">${(letters[i]||'?').toUpperCase()}</span>
    <input class="qb-correct" type="radio" name="visual_correct" value="${i}" ${q.correct===i?'checked':''} title="Правильный ответ">
    <input class="form-control qb-option-text" type="text" value="${esc(label)}" placeholder="Вариант ответа">
    <button class="qb-icon-btn danger qb-remove-option" type="button" title="Удалить вариант">×</button>
   </div>`).join('');
  document.getElementById('moveQuestionUp').disabled=state.active===0;
  document.getElementById('moveQuestionDown').disabled=state.active===state.questions.length-1;
  document.getElementById('deleteQuestion').disabled=state.questions.length===1;
  sync();
 }

 function render(){
  renderList();
  renderEditor();
 }

 function select(index){
  state.active=Math.max(0,Math.min(index,state.questions.length-1));
  render();
 }

 function move(from,to){
  if(to<0||to>=state.questions.length||from===to)return;
  const [item]=state.questions.splice(from,1);
  state.questions.splice(to,0,item);
  state.active=to;
  render();
 }

 list.addEventListener('click',e=>{
  const item=e.target.closest('.qb-question-item');
  if(item)select(Number(item.dataset.index));
 });
 list.addEventListener('dragstart',e=>{
  const item=e.target.closest('.qb-question-item');
  if(!item)return;
  dragIndex=Number(item.dataset.index);
  item.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';
 });
 list.addEventListener('dragend',e=>{
  e.target.closest('.qb-question-item')?.classList.remove('dragging');
  dragIndex=null;
 });
 list.addEventListener('dragover',e=>e.preventDefault());
 list.addEventListener('drop',e=>{
  e.preventDefault();
  const target=e.target.closest('.qb-question-item');
  if(!target||dragIndex===null)return;
  move(dragIndex,Number(target.dataset.index));
 });

 questionText.addEventListener('input',()=>{
  current().question=questionText.value;
  renderList();
 });

 optionList.addEventListener('input',e=>{
  if(!e.target.classList.contains('qb-option-text'))return;
  const row=e.target.closest('.qb-option');
  current().options[Number(row.dataset.option)]=e.target.value;
  sync();
 });
 optionList.addEventListener('change',e=>{
  if(!e.target.classList.contains('qb-correct'))return;
  current().correct=Number(e.target.value);
  renderEditor();
 });
 optionList.addEventListener('click',e=>{
  const btn=e.target.closest('.qb-remove-option');
  if(!btn)return;
  const q=current();
  if(q.options.length<=2){alert('В вопросе должно быть минимум два варианта ответа.');return;}
  const index=Number(btn.closest('.qb-option').dataset.option);
  q.options.splice(index,1);
  if(q.correct===index)q.correct=0;
  else if(q.correct>index)q.correct--;
  renderEditor();
 });

 document.getElementById('addOption').addEventListener('click',()=>{
  const q=current();
  if(q.options.length>=26){alert('Максимум 26 вариантов ответа.');return;}
  q.options.push('Новый вариант');
  renderEditor();
  const inputs=optionList.querySelectorAll('.qb-option-text');
  inputs[inputs.length-1]?.focus();
  inputs[inputs.length-1]?.select();
 });

 document.getElementById('addQuestion').addEventListener('click',()=>{
  state.questions.push({question:'Новый вопрос',options:['Вариант ответа 1','Вариант ответа 2'],correct:0});
  select(state.questions.length-1);
  questionText.focus();
  questionText.select();
 });
 document.getElementById('duplicateQuestion').addEventListener('click',()=>{
  const copy=JSON.parse(JSON.stringify(current()));
  copy.question=copy.question+' — копия';
  state.questions.splice(state.active+1,0,copy);
  select(state.active+1);
 });
 document.getElementById('deleteQuestion').addEventListener('click',()=>{
  if(state.questions.length<=1)return;
  if(!confirm('Удалить этот вопрос?'))return;
  state.questions.splice(state.active,1);
  state.active=Math.min(state.active,state.questions.length-1);
  render();
 });
 document.getElementById('moveQuestionUp').addEventListener('click',()=>move(state.active,state.active-1));
 document.getElementById('moveQuestionDown').addEventListener('click',()=>move(state.active,state.active+1));

 document.getElementById('quizBuilderForm').addEventListener('submit',e=>{
  const invalid=state.questions.findIndex(q=>!q.question.trim()||q.options.length<2||q.options.some(x=>!String(x).trim()));
  if(invalid>=0){
   e.preventDefault();
   select(invalid);
   alert('Заполните вопрос '+(invalid+1)+' и все варианты ответов.');
   return;
  }
  sync();
 });

 render();
})();
</script>
@endsection
