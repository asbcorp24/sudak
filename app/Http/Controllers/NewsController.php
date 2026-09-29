<?php
namespace App\Http\Controllers;

use App\Models\NewsPost;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $data=$request->validate([
            'date_from'=>['nullable','date'],
            'date_to'=>['nullable','date','after_or_equal:date_from'],
        ]);

        $query=NewsPost::with('media')
            ->published()
            ->latest('published_at');

        if(!empty($data['date_from'])){
            $query->where('published_at','>=',$data['date_from'].' 00:00:00');
        }

        if(!empty($data['date_to'])){
            $query->where('published_at','<=',$data['date_to'].' 23:59:59');
        }

        return view('news.index',[
            'posts'=>$query->paginate(9)->withQueryString(),
        ]);
    }

    public function show($slug)
    {
        $post=NewsPost::with('media')->published()->where('slug',$slug)->firstOrFail();
        return view('news.show',compact('post'));
    }
}
