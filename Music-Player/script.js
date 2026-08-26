const songs = [
    {
        title: "ESCAPE YOUR LOVE",
        src: "music/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Kia Tum Ho Gae",
        src: "music/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Tere Baad Bhi",
        src: "music/song3.mp3",
        cover: "images/cover3.jpg"
    },
    {
        title: "Parrty Remix",
        src: "music/song4.mp3",
        cover: "images/cover4.jpg"
    }
];

const audioPlayer = document.getElementById("audioPlayer");
const albumCover = document.getElementById("albumCover");
const songTitle = document.getElementById("songTitle");
const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar");
const playlistSongs = document.getElementById("playlistSongs");

let currentSongIndex = 0;

function formatTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function loadSong(index) {
    const song = songs[index];

    songTitle.textContent = song.title;
    albumCover.src = song.cover;
    audioPlayer.src = song.src;

    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    updatePlaylist();
}

function playSong() {
    audioPlayer.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseSong() {
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

function nextSong() {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    playSong();
}

nextBtn.addEventListener("click", nextSong);

function previousSong() {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);
    playSong();
}

previousBtn.addEventListener("click", previousSong);

audioPlayer.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audioPlayer.duration);
    progressBar.value = 0;
});

audioPlayer.addEventListener("timeupdate", () => {
    if (!audioPlayer.duration) {
        return;
    }

    const progress =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.value = progress;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
});

progressBar.addEventListener("input", () => {
    if (!audioPlayer.duration) {
        return;
    }

    audioPlayer.currentTime =
        (progressBar.value / 100) * audioPlayer.duration;
});

volumeBar.addEventListener("input", () => {
    audioPlayer.volume = volumeBar.value;
});

audioPlayer.addEventListener("ended", () => {
    nextSong();
});

function updatePlaylist() {
    playlistSongs.innerHTML = "";

    songs.forEach((song, index) => {
        const songItem = document.createElement("div");

        songItem.classList.add("song-item");

        if (index === currentSongIndex) {
            songItem.classList.add("active");
        }

        songItem.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">

            <div class="song-details">
                <h4>${song.title}</h4>
            </div>
        `;

        songItem.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        playlistSongs.appendChild(songItem);
    });
}

loadSong(currentSongIndex);

audioPlayer.volume = 1;