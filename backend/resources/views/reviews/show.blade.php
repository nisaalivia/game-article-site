@extends('layout')

@section('content')
<div class="review-detail">
    <h1>{{ $review->Judul }}</h1>
    <p class="review-meta">
        By {{ $review->author }} | {{ $review->created_at->format('M d, Y') }}
    </p>
    
    <div class="review-content">
        <h3>Deskripsi</h3>
        {{ $review->Deskripsi }}
        <h3>Kelebihan</h3>
        {{ $review->Kelebihan }}
        <h3>Kekurangan</h3>
        {{ $review->Kekurangan }}
        <h3>Kesimpulan</h3>
        {{ $review->Kesimpulan }}
        <p><strong>Rating:</strong> {{ $review->Rating }}/10</p>
    </div>
    
    @if($review->comments->count())
        <div class="comments-section">
            <h3>Comments ({{ $review->comments->count() }})</h3>
            @foreach($review->comments as $comment)
                <div class="comment">
                    <p class="comment-author"><strong>{{ $comment->author }}</strong></p>
                    <p class="comment-text">{{ $comment->content }}</p>
                    <span class="comment-date">{{ $comment->created_at->format('M d, Y') }}</span>
                </div>
            @endforeach
        </div>
    @else
        <p>No comments yet.</p>
    @endif
    
    <a href="{{ route('reviews.index') }}" class="back-link">Back to Reviews</a>
</div>
@endsection
