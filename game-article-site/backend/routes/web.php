<?php

use App\Http\Controllers\gamereviewController;
use App\Http\Controllers\gamedevController;
use App\Http\Controllers\commentController;

// Review Routes
Route::get('/reviews', [gamereviewController::class, 'index'])->name('reviews.index');
Route::get('/reviews/{ReviewID}', [gamereviewController::class, 'show'])->name('reviews.show');

// Developer Routes
Route::get('/developers', [gamedevController::class, 'index'])->name('developers.index');

// Comment Submission
Route::post('/comments', [commentController::class, 'store'])->name('comments.store');
