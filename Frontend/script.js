
const gameData = {
    title: "Forza Horizon 6: Evolusi Balap Open-World di Jepang",
    description: "Forza Horizon 6 hadir sebagai evolusi ambisius dari seri balap open-world legendaris Playground Games. Mengambil lokasi di Jepang—destinasi yang paling banyak diminta oleh penggemar selama bertahun-tahun—game ini menjanjikan perpaduan antara kehidupan perkotaan Tokyo yang gemerlap dan rute pegunungan yang menantang. Dengan pendekatan baru yang menempatkan pemain sebagai 'turis' yang meniti karier hingga menjadi 'Horizon Legend', game ini dirancang untuk memberikan pengalaman naratif yang lebih personal dan mendalam.",
    pros: [
        "Lokasi Ikonik: Tokyo dan rute pegunungan.",
        "Fitur Kreatif: Horizon CoLab untuk membangun trek.",
        "Kustomisasi Luas: Modifikasi lebih detail.",
        "Multi-Platform: Kini hadir di PlayStation 5."
    ],
    cons: [
        "Beban Performa: Butuh spesifikasi hardware tinggi.",
        "Penyimpanan: Ukuran file sangat besar.",
        "Ekspektasi: Tekanan besar dari komunitas fans."
    ],
    summary: "Forza Horizon 6 adalah kandidat kuat game balap terbaik dengan integrasi sosial dan kustomisasi yang lebih modern. Jika kamu pecinta otomotif yang mencari pengalaman open-world yang imersif di Jepang, game ini adalah pilihan wajib.",
    rating: "9.5/10"
};

function renderArticle() {
    const container = document.getElementById('article-container');
    if(!container) return; 

    container.innerHTML = `
        <h2 class="mb-3">${gameData.title}</h2>
        <p>${gameData.description}</p>

        <div class="row mt-4">
            <div class="col-md-6">
                <h4 class="text-white">Kelebihan</h4>
                <ul class="list-unstyled">
                    ${gameData.pros.map(item => `<li> - <strong>${item.split(':')[0]}:</strong> ${item.split(':')[1]}</li>`).join('')}
                </ul>
            </div>
            <div class="col-md-6">
                <h4 class="text-white">Kekurangan</h4>
                <ul class="list-unstyled">
                    ${gameData.cons.map(item => `<li> - <strong>${item.split(':')[0]}:</strong> ${item.split(':')[1]}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="card bg-dark text-white p-4 mt-4 border-0">
            <h4 class="text-info">Kesimpulan</h4>
            <p>${gameData.summary}</p>
            <h3 class="text-warning">Overall Rating: ${gameData.rating}</h3>
        </div>
    `;
}

function postComment() {
    const nameInput = document.getElementById('userName');
    const commentInput = document.getElementById('commentBox');
    const commentList = document.getElementById('commentList');
    
    if(nameInput.value.trim() !== "" && commentInput.value.trim() !== "") {
        
        const newComment = document.createElement('div');
        newComment.className = "card p-3 mb-2 shadow-sm text-dark border-0"; 
        
        newComment.innerHTML = `
            <div class="d-flex justify-content-between">
                <strong>@${nameInput.value}</strong>
                <small class="text-muted">Baru saja</small>
            </div>
            <p class="mb-0 mt-1">${commentInput.value}</p>
        `;
        
        commentList.prepend(newComment);

        nameInput.value = "";
        commentInput.value = "";
        
    } else {
        alert("Mohon isi Nama dan Komentar Anda sebelum mengirim!");
    }
}

window.onload = renderArticle;