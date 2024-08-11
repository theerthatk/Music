document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://www.theaudiodb.com/api/v1/json/2/album.php?i=112024';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const albums = data.album || [];
            const albumContainer = document.getElementById('album-container');

            if (albums.length > 0) {
                let cardContent = '';

                albums.forEach(album => {
                    const albumArt = album.strAlbumThumb || 'placeholder.jpg';
                    cardContent += `
               <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 album-card" data-title="${album.strAlbum}">
    <div class="card spotify-card">
        <img src="${albumArt.startsWith('http') ? albumArt : 'https://www.theaudiodb.com/images/placeholder.jpg'}" class="card-img-top" alt="${album.strAlbum}">
        <button class="play-button"></button> <!-- Play button with a play icon -->
        <div class="card-body">
            <h5 class="card-title">${album.strAlbum}</h5>
            <p class="card-text">${album.intYearReleased}</p>
        </div>
    </div>
</div>
`;
                });

                albumContainer.innerHTML = cardContent;
            } else {
                albumContainer.innerHTML = '<div class="col-12"><p>No albums found</p></div>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('album-container').innerHTML = '<div class="col-12"><p>Error loading albums.</p></div>';
        });
});

