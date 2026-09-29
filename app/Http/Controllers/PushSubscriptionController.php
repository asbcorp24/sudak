<?php

namespace App\Http\Controllers;

use App\Models\PushSubscription;
use Illuminate\Http\Request;

class PushSubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $data=$request->validate([
            'endpoint'=>['required','string','max:4096'],
            'keys.p256dh'=>['required','string','max:1000'],
            'keys.auth'=>['required','string','max:500'],
            'contentEncoding'=>['nullable','string','max:40'],
        ]);

        $hash=hash('sha256',$data['endpoint']);
        PushSubscription::updateOrCreate(
            ['endpoint_hash'=>$hash],
            [
                'user_id'=>$request->user()->id,
                'endpoint'=>$data['endpoint'],
                'public_key'=>$data['keys']['p256dh'],
                'auth_token'=>$data['keys']['auth'],
                'content_encoding'=>$data['contentEncoding']??'aes128gcm',
                'user_agent'=>substr((string)$request->userAgent(),0,500),
            ]
        );

        return response()->json(['ok'=>true]);
    }

    public function destroy(Request $request)
    {
        $endpoint=$request->validate(['endpoint'=>['required','string','max:4096']])['endpoint'];
        PushSubscription::where('user_id',$request->user()->id)
            ->where('endpoint_hash',hash('sha256',$endpoint))->delete();
        return response()->json(['ok'=>true]);
    }
}
