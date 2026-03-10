<?php

namespace App\Http\Controllers;

use App\Models\gamereview;
use Illuminate\Http\Request;

class gamereviewController extends Controller
{
    public function index()
    {
        $reviews = gamereview::all();
        return view('reviews.index', compact('reviews'));
    }

    public function show($id)
    {
        // Eager load comments to show feedback from users like Andre and Ara
        $review = gamereview::with('comments')->findOrFail($id);
        return view('reviews.show', compact('review'));
    }
}