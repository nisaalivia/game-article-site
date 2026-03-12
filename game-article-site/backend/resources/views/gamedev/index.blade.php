@extends('layout')

@section('content')
<div class="gamedev-container">
    <h1>Game Developers</h1>
    
    @if($devs->count())
        <div class="devs-list">
            @foreach($devs as $dev)
                <div class="dev-card">
                    <h2>{{ $dev->NamaStudio }}</h2>
                    <p class="dev-meta">
                        Spesialisasi: {{ $dev->Spesialisasi ?? 'N/A' }} | Lokasi: {{ $dev->Lokasi ?? 'N/A' }}
                    </p>
                    @if($dev->created_at)
                    <p class="created-date">{{ $dev->created_at->format('M d, Y') }}</p>
                    @endif
                </div>
            @endforeach
        </div>
    @else
        <p>No developers available yet.</p>
    @endif
</div>
@endsection
