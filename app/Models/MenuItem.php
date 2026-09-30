<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;

class MenuItem extends Model
{
    protected $fillable=['parent_id','page_id','title','link_type','route_name','url','open_in_new_tab','is_active','show_desktop','show_mobile','sort'];
    protected $casts=['open_in_new_tab'=>'boolean','is_active'=>'boolean','show_desktop'=>'boolean','show_mobile'=>'boolean'];

    public function parent(){ return $this->belongsTo(self::class,'parent_id'); }
    public function children(){ return $this->hasMany(self::class,'parent_id')->orderBy('sort')->orderBy('id'); }
    public function childrenRecursive(){ return $this->children()->where('is_active',1)->with(['page','childrenRecursive']); }
    public function page(){ return $this->belongsTo(Page::class); }

    public function href(): string
    {
        if ($this->link_type==='page' && $this->page) return route('pages.show',$this->page->slug);
        if ($this->link_type==='route' && $this->route_name && Route::has($this->route_name)) {
            if ($this->route_name==='student.login' && auth()->check() && auth()->user()->user_type==='student') return route('student.dashboard');
            return route($this->route_name);
        }
        if ($this->link_type==='url' && $this->url) return str_starts_with($this->url,'/') ? url($this->url) : $this->url;
        return '#';
    }
}