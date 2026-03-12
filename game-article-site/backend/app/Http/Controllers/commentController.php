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

        $comment = comment::create([
            'ReviewID' => $request->ReviewID,
            'Name' => $request->Name,
            'Comment' => $request->Comment,
        ]);

        // Return JSON response for API requests
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Comment added successfully!',
                'comment' => $comment
            ], 201);
        }

        return back()->with('success', 'Comment added successfully!');
    }
}