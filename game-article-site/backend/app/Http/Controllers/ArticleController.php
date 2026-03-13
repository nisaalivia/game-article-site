<?php

namespace App\Http\Controllers;

use App\Models\gamereview;
use App\Models\gamedev;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function show($id)
    {
        // Fetch article data from gamereview table
        $review = gamereview::with('comments')->findOrFail($id);
        
        // Fetch game developer info
        $developer = gamedev::first();
        
        $articleData = [
            'article' => [
                'id' => $review->ReviewID,
                'title' => $review->Judul,
                'description' => $review->Deskripsi,
                'pros' => explode(',', $review->Kelebihan),
                'cons' => explode(',', $review->Kekurangan),
                'summary' => $review->Kesimpulan,
                'rating' => $review->Rating . '/10'
            ],
            'gameInfo' => [
                'developer' => $developer?->NamaStudio ?? 'Unknown Studio',
                'genre' => $developer?->Spesialisasi ?? 'Unknown',
                'location' => $developer?->Lokasi ?? 'Unknown'
            ],
            'comments' => $review->comments->map(function($comment) {
                return [
                    'name' => $comment->Name,
                    'text' => $comment->Comment,
                    'date' => $comment->created_at?->format('M d, Y')
                ];
            })->toArray()
        ];

        return response()->json($articleData);
    }
}
