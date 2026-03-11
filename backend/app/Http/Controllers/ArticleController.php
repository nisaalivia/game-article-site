<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function show($id)
    {
        $article = [
            'id' => $id,
            'title' => 'Article Title',
            'content' => 'Example content.',
            'status' => 'success'
        ];

        return response()->json($article);
    }
}
