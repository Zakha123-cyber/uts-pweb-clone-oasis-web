const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  mobileMenu.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.style.display = "none";
});

// Countdown Timer
function updateCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 67); // 67 days from now

  const now = new Date();
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.querySelector(".countdown-box:nth-child(1)").innerHTML = `
                <div class="countdown-digit">${Math.floor(days / 10)}</div>
                <div class="countdown-digit">${days % 10}</div>
                <span class="countdown-label">DAYS</span>
            `;

  document.querySelector(".countdown-box:nth-child(2)").innerHTML = `
                <div class="countdown-digit">${hours < 10 ? "0" + hours : hours}</div>
                <span class="countdown-label">HOURS</span>
            `;

  document.querySelector(".countdown-box:nth-child(3)").innerHTML = `
                <div class="countdown-digit">${Math.floor(minutes / 10)}</div>
                <div class="countdown-digit">${minutes % 10}</div>
                <span class="countdown-label">MINUTES</span>
            `;

  document.querySelector(".countdown-box:nth-child(4)").innerHTML = `
                <div class="countdown-digit">${Math.floor(seconds / 100)}</div>
                <div class="countdown-digit">${Math.floor((seconds % 100) / 10)}</div>
                <div class="countdown-digit">${seconds % 10}</div>
                <span class="countdown-label">SECONDS</span>
            `;
}

document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.getElementById("video-container");
  const thumbnail = document.getElementById("video-thumbnail");
  const playButton = document.getElementById("play-button");
  const videoOverlay = document.getElementById("video-overlay");
  const youtubeEmbed = document.getElementById("youtube-embed-container");

  // Modifikasi src iframe untuk menambahkan autoplay
  const iframe = youtubeEmbed.querySelector("iframe");
  const originalSrc = iframe.src;

  videoContainer.addEventListener("click", function () {
    // Tambahkan parameter autoplay ke URL iframe
    iframe.src = originalSrc + "?autoplay=1";

    // Sembunyikan thumbnail, tombol play dan overlay
    thumbnail.style.display = "none";
    playButton.style.display = "none";
    videoOverlay.style.display = "none";

    // Tampilkan embed YouTube
    youtubeEmbed.style.display = "block";
  });
});

// Dark Mode Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode-checkbox");

  // Check for saved dark mode preference or respect OS preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark" || (!storedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-theme");
    darkModeToggle.checked = true;
  }

  // Listen for toggle changes
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  });
});

// Optional JavaScript for additional functionality
document.addEventListener("DOMContentLoaded", function () {
  const newsCards = document.querySelectorAll(".news-card");

  newsCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // If the click is not on the "Read more" link itself, find and click the link
      if (!e.target.classList.contains("read-more")) {
        const readMoreLink = this.querySelector(".read-more");
        if (readMoreLink) {
          e.preventDefault();
          readMoreLink.click();
        }
      }
    });
  });
});

const playlistScroll = document.getElementById("playlist-scroll");
const leftButton = document.querySelector(".custom-scrollbar-button.left");
const rightButton = document.querySelector(".custom-scrollbar-button.right");
const scrollbarThumb = document.getElementById("scrollbar-thumb");

// Scroll Function
leftButton.addEventListener("click", () => {
  playlistScroll.scrollBy({ left: -300, behavior: "smooth" });
});

rightButton.addEventListener("click", () => {
  playlistScroll.scrollBy({ left: 300, behavior: "smooth" });
});

// Update Thumb Position
function updateThumb() {
  const scrollWidth = playlistScroll.scrollWidth - playlistScroll.clientWidth;
  const trackWidth = document.querySelector(".custom-scrollbar-track").clientWidth;
  const thumbWidth = (playlistScroll.clientWidth / playlistScroll.scrollWidth) * trackWidth;
  const left = (playlistScroll.scrollLeft / scrollWidth) * (trackWidth - thumbWidth);

  scrollbarThumb.style.width = thumbWidth + "px";
  scrollbarThumb.style.left = left + "px";
}

playlistScroll.addEventListener("scroll", updateThumb);
window.addEventListener("resize", updateThumb);
window.addEventListener("load", updateThumb);
