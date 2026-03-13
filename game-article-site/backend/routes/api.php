<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\commentController;
use Illuminate\Support\Facades\Route;

Route::get('/article/{id}', [ArticleController::class, 'show']);
Route::post('/comments', [commentController::class, 'store']);