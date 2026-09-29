<?php

return [
    'webpush'=>[
        'public_key'=>env('WEBPUSH_PUBLIC_KEY'),
        'private_key'=>env('WEBPUSH_PRIVATE_KEY'),
        'subject'=>env('WEBPUSH_SUBJECT',env('APP_URL')),
    ],
];
