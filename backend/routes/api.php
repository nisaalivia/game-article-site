<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

Route::get('/article/{id}', [ArticleController::class, 'show']);
