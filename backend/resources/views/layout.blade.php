<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Article Site</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #1a1a1a;
            color: #e0e0e0;
            line-height: 1.6;
        }
        
        header {
            background-color: #0d0d0d;
            padding: 1rem 2rem;
            border-bottom: 2px solid #ff6b6b;
        }
        
        header h1 {
            color: #ff6b6b;
            font-size: 1.8rem;
        }
        
        nav {
            background-color: #1f1f1f;
            padding: 1rem 2rem;
        }
        
        nav a {
            color: #ff6b6b;
            text-decoration: none;
            margin-right: 1.5rem;
            font-weight: 500;
        }
        
        nav a:hover {
            color: #ff8787;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .reviews-container, .review-detail {
            margin-top: 2rem;
        }
        
        .reviews-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .review-card {
            background-color: #2a2a2a;
            border: 1px solid #404040;
            border-radius: 8px;
            padding: 1.5rem;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .review-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(255, 107, 107, 0.2);
            border-color: #ff6b6b;
        }
        
        .review-card h2 {
            margin-bottom: 0.5rem;
            color: #ffffff;
        }
        
        .review-card h2 a {
            color: #ff6b6b;
            text-decoration: none;
        }
        
        .review-card h2 a:hover {
            color: #ff8787;
        }
        
        .review-meta {
            color: #999;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .review-card p {
            color: #d0d0d0;
            margin-bottom: 1rem;
        }
        
        .read-more {
            display: inline-block;
            background-color: #ff6b6b;
            color: #1a1a1a;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.2s;
        }
        
        .read-more:hover {
            background-color: #ff8787;
        }
        
        .review-detail {
            background-color: #2a2a2a;
            border: 1px solid #404040;
            border-radius: 8px;
            padding: 2rem;
        }
        
        .review-detail h1 {
            color: #ff6b6b;
            margin-bottom: 1rem;
        }
        
        .review-detail h3 {
            color: #ff8787;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .review-content {
            line-height: 1.8;
            color: #d0d0d0;
            margin-bottom: 2rem;
        }
        
        .comments-section {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #404040;
        }
        
        .comment {
            background-color: #1a1a1a;
            padding: 1rem;
            border-left: 3px solid #ff6b6b;
            margin-bottom: 1rem;
            border-radius: 4px;
        }
        
        .comment-author {
            color: #ff6b6b;
            margin-bottom: 0.5rem;
        }
        
        .comment-text {
            color: #d0d0d0;
            margin-bottom: 0.5rem;
        }
        
        .comment-date {
            color: #666;
            font-size: 0.85rem;
        }
        
        .back-link {
            display: inline-block;
            margin-top: 2rem;
            background-color: #404040;
            color: #ff6b6b;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.2s;
        }
        
        .back-link:hover {
            background-color: #505050;
        }
        
        footer {
            background-color: #0d0d0d;
            color: #666;
            text-align: center;
            padding: 2rem;
            margin-top: 3rem;
            border-top: 1px solid #404040;
        }
    </style>
</head>
<body>
    <header>
        <h1>🎮 Game Article Site</h1>
    </header>
    
    <nav>
        <a href="{{ route('reviews.index') }}">Reviews</a>
        <a href="{{ route('developers.index') }}">Developers</a>
    </nav>
    
    <div class="container">
        @yield('content')
    </div>
    
    <footer>
        <p>&copy; 2026 Game Article Site. All rights reserved.</p>
    </footer>
</body>
</html>
