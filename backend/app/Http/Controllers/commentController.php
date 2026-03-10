<?php

namespace App\Http\Controllers;

use App\Models\comment;
use Illuminate\Http\Request;

class commentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'ReviewID' => 'required|exists:gamereview,ReviewID',
            'Name' => 'required|string|max:50',
            'Comment' => 'required|string|max:250',
        ]);

        comment::create([
            'ReviewID' => $request->ReviewID,
            'Name' => $request->Name,
            'Comment' => $request->Comment,
        ]);

        return back()->with('success', 'Comment added successfully!');
    }
}