const ALL_SONGS = Object.freeze([
    { id: 1, title: 'Summer Vibe', artist: 'Pop Star', genre: 'pop', img: 'https://via.placeholder.com/400x400?text=Pop+Music', duration: '3:45' },
    { id: 2, title: 'Midnight City', artist: 'The Rockers', genre: 'rock', img: 'https://via.placeholder.com/400x400?text=Rock+Band', duration: '4:12' },
    { id: 3, title: 'Flow State', artist: 'MC Groove', genre: 'hiphop', img: 'https://via.placeholder.com/400x400?text=HipHop+Art', duration: '3:05' },
    { id: 4, title: 'Blue Notes', artist: 'Cool Cat', genre: 'jazz', img: 'https://via.placeholder.com/400x400?text=Jazz+Sax', duration: '5:01' },
    { id: 5, title: 'Love Song', artist: 'Pop Star', genre: 'pop', img: 'https://via.placeholder.com/400x400?text=Romantic+Pop', duration: '3:50' },
    { id: 6, title: 'Hard Drive', artist: 'The Rockers', genre: 'rock', img: 'https://via.placeholder.com/400x400?text=Metal+Guitar', duration: '2:58' },
]);

const filterByGenre = (genre, songs) => 
    (genre === 'all')
        ? songs
        : songs.filter(song => song.genre === genre);

const searchByTerm = (searchTerm, songs) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return songs;
    return songs.filter(song => 
        song.title.toLowerCase().includes(term) || 
        song.artist.toLowerCase().includes(term)
    );
};

const createSongCard = (song) => {
    return `
        <div class="col">
            <div class="card h-100 song-card">
                <img src="${song.img}" class="card-img-top" alt="${song.title}">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-dark">${song.title}</h5>
                    <p class="card-text text-muted">${song.artist}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="badge badge-genre">${song.genre.toUpperCase()}</span>
                        <span class="badge badge-duration"><i class="bi bi-clock"></i> ${song.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const renderSongs = (songs) => {
    const songListElement = document.getElementById('song-list');
    
    const htmlCards = songs.map(createSongCard).join(''); 
    
    songListElement.innerHTML = htmlCards || '<p class="text-center w-100 fs-4 text-secondary">ไม่พบเพลงที่คุณต้องการ 😞 ลองค้นหาใหม่ดูสิ</p>';
};

const updateSongDisplay = () => {
    const searchTerm = document.getElementById('search-input').value;
    const genre = document.getElementById('genre-filter').value;

    const filteredByGenre = filterByGenre(genre, ALL_SONGS);
    const finalSongs = searchByTerm(searchTerm, filteredByGenre);

    renderSongs(finalSongs);
};

document.addEventListener('DOMContentLoaded', () => {
    renderSongs(ALL_SONGS);

    document.getElementById('search-input').addEventListener('input', updateSongDisplay);
    document.getElementById('genre-filter').addEventListener('change', updateSongDisplay);
});