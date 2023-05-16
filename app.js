// YouTube API Key
const apiKey = "AIzaSyChfODLqi97Kl1jToxtzIGmWdET2TtxACQ";

// Video Grid Element
const videoGrid = document.querySelector(".video-grid");

// Fetch YouTube Video Data
async function fetchVideoData() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=10000&q=`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
}

// Limit title to 9 words
function limitTitle(title) {
    const words = title.split(" ");
    if (words.length > 8) {
        title = words.slice(0, 6).join(" ") + " ...";
    }
    return title;
}

// Render Video Cards
async function renderVideoCards() {
    const videoData = await fetchVideoData();
    videoGrid.innerHTML = "";
    videoData.forEach((item) => {
        const videoId = item.id.videoId;
        const videoTitle = limitTitle(item.snippet.title);
        const videoAuthor = item.snippet.channelTitle;
        const thumbnailUrl = item.snippet.thumbnails.medium.url; // use channel's medium or high image instead of video thumbnail
        const channelImageUrl = item.snippet.thumbnails.high.url; // get the channel image url
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
<div class="thumbnail-container">
<img src="${channelImageUrl}" alt="${videoAuthor}" />
</div>
<div class="video-info">
<h2 class="video-title">${videoTitle}</h2>
<p class="video-author">${videoAuthor}</p>
<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="watch-on-youtube-btn">Watch</a>
</div>
`;
        videoGrid.appendChild(videoCard);
    });
}

// Initialize App
async function init() {
    await renderVideoCards();
}

init();