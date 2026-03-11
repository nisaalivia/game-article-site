@extends('layout')

@section('content')
<div class="reviews-container">
    <h1>Game Reviews</h1>
    
    @if($reviews->count())
        <div class="reviews-list">
            @foreach($reviews as $review)
                <div class="review-card">
                    <h2>
                        <a href="{{ route('reviews.show', $review->ReviewID) }}">
                            {{ $review->Judul }}
                        </a>
                    </h2>
                    <p class="review-meta">
                        By {{ $review->author }} | {{ $review->created_at->format('M d, Y') }}
                    </p>
                    <p>{{ Str::limit($review->Deskripsi, 200) }}</p>
                    <a href="{{ route('reviews.show', $review->ReviewID) }}" class="read-more">Read Full Review</a>
                </div>
            @endforeach
        </div>
    @else
        <p>No reviews available yet.</p>
    @endif
</div>
@endsection
