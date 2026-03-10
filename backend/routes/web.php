<?php

use App\Http\Controllers\gamereviewController;
use App\Http\Controllers\gamedevController;
use App\Http\Controllers\commentController;

// Review Routes
Route::get('/reviews', [gamereviewController::class, 'index']);
Route::get('/reviews/{id}', [gamereviewController::class, 'show']);

// Developer Routes
Route::get('/developers', [gamedevController::class, 'index']);

// Comment Submission
Route::post('/comments', [commentController::class, 'store']);
