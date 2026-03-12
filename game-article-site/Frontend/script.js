const API_BASE_URL = "http://127.0.0.1:8000/api"; 
const ARTICLE_ID = new URLSearchParams(window.location.search).get('id') || 1;

function renderStars(rating) {
    let stars = "";
    const totalStars = Math.round(rating); 
    
    for (let i = 1; i <= 5; i++) {
        if (i <= totalStars) {
            stars += "⭐"; 
        } else {
            stars += "☆"; 
        }
    }
    return stars;
}

async function loadData() {
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) {
        articleContainer.innerHTML = "<p class='text-white'>Memuat data dari server...</p>";
    }

    try {
        const response = await fetch(`${API_BASE_URL}/article/${ARTICLE_ID}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        
        const data = await response.json();

        displayArticle(data.article);
        displayGameInfo(data.gameInfo);
        displayComments(data.comments); 

    } catch (error) {
        console.error("Error:", error);
        if (articleContainer) {
            articleContainer.innerHTML = "<p class='text-danger'>Gagal memuat data dari server.</p>";
        }
    }
}

function displayArticle(article) {
    const container = document.getElementById('article-container');
    if (!container) return;

    container.innerHTML = `
        <h2 class="mb-3">${article.title}</h2>
        <p>${article.description}</p>
        <div class="row mt-4">
            <div class="col-md-6">
                <h4 class="text-white">Kelebihan</h4>
                <ul class="list-unstyled">
                    ${article.pros.map(item => `<li class="text-white">- ${item.trim()}</li>`).join('')}
                </ul>
            </div>
            <div class="col-md-6">
                <h4 class="text-white">Kekurangan</h4>
                <ul class="list-unstyled">
                    ${article.cons.map(item => `<li class="text-white">- ${item.trim()}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="card bg-dark text-white p-4 mt-4 border-0">
            <h4 class="text-info">Kesimpulan</h4>
            <p>${article.summary}</p>
            <h3 class="text-warning">Overall Rating: ${renderStars(article.rating)} (${article.rating}/5)</h3>
        </div>
    `;
}

function displayGameInfo(info) {
    const devInfo = document.getElementById('dev-info');
    if (devInfo) {
        devInfo.innerHTML = `
            <strong>Nama Studio:</strong> ${info.developer}<br>
            <strong>Spesialisasi:</strong> ${info.genre}<br>
            <strong>Lokasi:</strong> ${info.location}
        `;
    }
}

function displayComments(comments) {
    const commentList = document.getElementById('commentList');
    if (!commentList) return;
    
    if (comments && comments.length > 0) {
        commentList.innerHTML = comments.map(c => `
            <div class="card p-3 mb-2 shadow-sm border-0">
                <strong>@${c.name}</strong>
                <p class="mb-0">${c.text}</p>
                ${c.date ? `<small class="text-muted">${c.date}</small>` : ''}
            </div>
        `).join('');
    } else {
        commentList.innerHTML = '<p class="text-muted">Belum ada komentar. Jadi yang pertama!</p>';
    }
}

async function postComment() {
    const nameInput = document.getElementById('userName');
    const commentInput = document.getElementById('commentBox');

    if (!nameInput.value.trim() || !commentInput.value.trim()) {
        return alert("Harap isi nama dan komentar!");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ReviewID: ARTICLE_ID,
                Name: nameInput.value,
                Comment: commentInput.value
            })
        });

        if (response.ok) {
            nameInput.value = "";
            commentInput.value = "";
        
            loadData(); 
        } else {
            alert("Gagal mengirim komentar.");
        }
    } catch (error) {
        alert("Gagal terhubung ke server.");
        console.error(error);
    }
}

window.onload = loadData;