
const API_BASE_URL = "http://localhost:3000"; 

async function loadData() {
    const articleContainer = document.getElementById('article-container');
    articleContainer.innerHTML = "<p class='text-white'>Memuat data dari server...</p>";

    try {
        const response = await fetch(`${API_BASE_URL}/article-data`);
        const data = await response.json();

        displayArticle(data.article);
        displayGameInfo(data.gameInfo);
        loadComments();
    } catch (error) {
        console.error("Error:", error);
        articleContainer.innerHTML = "<p class='text-danger'>Gagal memuat data dari server. Pastikan API berjalan.</p>";
    }
}

function displayArticle(article) {
    const container = document.getElementById('article-container');
    container.innerHTML = `
        <h2 class="mb-3">${article.title}</h2>
        <p>${article.description}</p>
        <div class="row mt-4">
            <div class="col-md-6">
                <h4 class="text-white">Kelebihan</h4>
                <ul class="list-unstyled">
                    ${article.pros.map(item => `<li class="text-white">- <strong>${item.split(':')[0]}:</strong> ${item.split(':')[1]}</li>`).join('')}
                </ul>
            </div>
            <div class="col-md-6">
                <h4 class="text-white">Kekurangan</h4>
                <ul class="list-unstyled">
                    ${article.cons.map(item => `<li class="text-white">- <strong>${item.split(':')[0]}:</strong> ${item.split(':')[1]}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="card bg-dark text-white p-4 mt-4 border-0">
            <h4 class="text-info">Kesimpulan</h4>
            <p>${article.summary}</p>
            <h3 class="text-warning">Overall Rating: ${article.rating}</h3>
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

async function postComment() {
    const nameInput = document.getElementById('userName');
    const commentInput = document.getElementById('commentBox');
    const commentList = document.getElementById('commentList');
    
    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) return alert("Harap isi nama dan komentar!");

    const newComment = document.createElement('div');
    newComment.className = "card p-3 mb-2 shadow-sm border-0";
    newComment.innerHTML = `
        <strong>@${name}</strong>
        <p class="mb-0">${text}</p>
        <small class="text-muted">Sedang dikirim...</small>
    `;
    commentList.prepend(newComment); 

    nameInput.value = "";
    commentInput.value = "";

    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, text })
        });

        if (response.ok) {
           
            newComment.querySelector('small').innerText = "Terkirim";
        } else {
            throw new Error();
        }
    } catch (error) {
        alert("Gagal mengirim komentar ke server.");
        newComment.remove(); 
    }
}

async function loadComments() {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`);
        const comments = await response.json();
        
        const list = document.getElementById('commentList');
        list.innerHTML = ""; 
        
        [...comments].reverse().forEach(c => {
            list.innerHTML += `
                <div class="card p-3 mb-2 shadow-sm border-0">
                    <strong>@${c.name}</strong>
                    <p class="mb-0">${c.text}</p>
                </div>
            `;
        });
    } catch (error) {
        console.log("Belum ada komentar di server.");
    }
}

window.onload = loadData;