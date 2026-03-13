const API_BASE_URL = "http://127.0.0.1:8000/api";
const ARTICLE_ID = new URLSearchParams(window.location.search).get('id') || 1;

function renderStars(rating) {
    const total = Math.round(rating);
    let html = '';
    for (let i = 1; i <= 5; i++) html += i <= total ? '★' : '☆';
    return html;
}

function parseRating(raw) {
    const str = String(raw);
    const value = parseFloat(str.split('/')[0]);
    const max = str.includes('/10') ? 10 : 5;
    return { value, max, outOf5: max === 10 ? value / 2 : value };
}

function displayArticle(article) {
    const rating = parseRating(article.rating);
    document.getElementById('article-container').innerHTML = `
        <h2 class="mb-3">${article.title}</h2>
        <p>${article.description}</p>
        <div class="pros-cons-grid mt-4">
            <div class="pros-box">
                <h4>Kelebihan</h4>
                <ul class="list-unstyled mb-0">
                    ${article.pros.map(item => `<li>${item.trim()}</li>`).join('')}
                </ul>
            </div>
            <div class="cons-box">
                <h4>Kekurangan</h4>
                <ul class="list-unstyled mb-0">
                    ${article.cons.map(item => `<li>${item.trim()}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="summary-card">
            <h4>Kesimpulan</h4>
            <p>${article.summary}</p>
            <div class="rating-display">
                <span class="rating-stars">${renderStars(rating.outOf5)}</span>
                <span class="rating-score">${rating.value}</span>
                <div>
                    <div class="rating-label">Overall Rating</div>
                    <div class="rating-label">dari ${rating.max}</div>
                </div>
            </div>
        </div>`;
}

function displayGameInfo(info) {
    document.getElementById('dev-info').innerHTML = `
        <div style="display:flex;flex-direction:column;gap:0.5rem">
            <div><strong>Nama Studio</strong><br><span style="color:rgba(255,255,255,0.85)">${info.developer}</span></div>
            <div><strong>Spesialisasi</strong><br><span style="color:rgba(255,255,255,0.85)">${info.genre}</span></div>
            <div><strong>Lokasi</strong><br><span style="color:rgba(255,255,255,0.85)">${info.location}</span></div>
        </div>`;
}

function displayComments(comments) {
    const list = document.getElementById('commentList');
    if (comments && comments.length > 0) {
        list.innerHTML = comments.map(c => `
            <div class="comment-card">
                <div class="comment-name">@${c.name}</div>
                <p class="comment-text">${c.text}</p>
                ${c.date ? `<div class="comment-date">${c.date}</div>` : ''}
            </div>`).join('');
    } else {
        list.innerHTML = '<p class="no-comments">Belum ada komentar. Jadilah yang pertama!</p>';
    }
}

async function loadData() {
    document.getElementById('article-container').innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Memuat artikel...</p>
        </div>`;

    try {
        const response = await fetch(`${API_BASE_URL}/article/${ARTICLE_ID}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        displayArticle(data.article);
        displayGameInfo(data.gameInfo);
        displayComments(data.comments);
    } catch (error) {
        console.error(error);
        document.getElementById('article-container').innerHTML = `
            <div class="loading-state">
                <p style="color:#f87171">⚠ Gagal memuat data dari server.</p>
                <p style="color:var(--text-muted);font-size:0.85rem">Pastikan backend Laravel berjalan di port 8000.</p>
            </div>`;
    }
}

function appendComment(name, text) {
    const list = document.getElementById('commentList');
    const noComment = list.querySelector('.no-comments');
    if (noComment) noComment.remove();

    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const card = document.createElement('div');
    card.className = 'comment-card';
    card.innerHTML = `
        <div class="comment-name">@${name}</div>
        <p class="comment-text">${text}</p>
        <div class="comment-date">${date}</div>`;
    list.prepend(card);
}

async function postComment() {
    const nameInput = document.getElementById('userName');
    const commentInput = document.getElementById('commentBox');
    const submitBtn = document.getElementById('submitBtn');

    if (!nameInput.value.trim() || !commentInput.value.trim()) {
        return alert("Harap isi nama dan komentar!");
    }

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading-spinner" style="width:18px;height:18px;border-width:2px"></div>';

    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ReviewID: ARTICLE_ID, Name: name, Comment: text })
        });

        if (response.ok) {
            nameInput.value = '';
            commentInput.value = '';
            appendComment(name, text);
        } else {
            alert("Gagal mengirim komentar.");
        }
    } catch (error) {
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Kirim Komentar</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
}

window.onload = function () {
    loadData();

    const navbar = document.getElementById('mainNavbar');
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    function openMenu() {
        menuOpen = true;
        burgerBtn.classList.add('open');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    window.closeMenu = function () {
        menuOpen = false;
        burgerBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    burgerBtn.addEventListener('click', () => menuOpen ? window.closeMenu() : openMenu());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) window.closeMenu(); });
};