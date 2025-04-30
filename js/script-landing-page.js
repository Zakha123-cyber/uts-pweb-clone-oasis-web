const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  mobileMenu.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.style.display = "none";
});

// Tentukan tanggal target hanya sekali
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 67);

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.querySelector(".countdown-container").innerHTML = "<div>Event Started!</div>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.querySelector(".countdown-box:nth-child(1)").innerHTML = `
    <div class="digit-group">
      <div class="countdown-digit">${Math.floor(days / 10)}</div>
      <div class="countdown-digit">${days % 10}</div>
    </div>
    <span class="countdown-label">DAYS</span>
  `;

  document.querySelector(".countdown-box:nth-child(2)").innerHTML = `
    <div class="digit-group">
      <div class="countdown-digit">${hours < 10 ? "0" + hours : hours}</div>
    </div>
    <span class="countdown-label">HOURS</span>
  `;

  document.querySelector(".countdown-box:nth-child(3)").innerHTML = `
    <div class="digit-group">
      <div class="countdown-digit">${Math.floor(minutes / 10)}</div>
      <div class="countdown-digit">${minutes % 10}</div>
    </div>
    <span class="countdown-label">MINUTES</span>
  `;

  document.querySelector(".countdown-box:nth-child(4)").innerHTML = `
    <div class="digit-group">
      <div class="countdown-digit">${Math.floor(seconds / 100)}</div>
      <div class="countdown-digit">${Math.floor((seconds % 100) / 10)}</div>
      <div class="countdown-digit">${seconds % 10}</div>
    </div>
    <span class="countdown-label">SECONDS</span>
  `;
}

// Panggil pertama kali
updateCountdown();

// Jalankan setiap detik
setInterval(updateCountdown, 1000);

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

const scrollContainer = document.getElementById("playlist-scroll");
const scrollbarThumb = document.getElementById("scrollbar-thumb");
const leftButton = document.querySelector(".custom-scrollbar-button.left");
const rightButton = document.querySelector(".custom-scrollbar-button.right");
const track = document.querySelector(".custom-scrollbar-track");

function updateThumbPosition() {
  const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  const trackWidth = track.clientWidth - scrollbarThumb.clientWidth;

  const scrollLeft = scrollContainer.scrollLeft;
  const thumbLeft = (scrollLeft / scrollWidth) * trackWidth;
  scrollbarThumb.style.left = `${thumbLeft}px`;
}

function scrollByAmount(amount) {
  scrollContainer.scrollBy({ left: amount, behavior: "smooth" });
}

scrollContainer.addEventListener("scroll", updateThumbPosition);

leftButton.addEventListener("click", () => scrollByAmount(-300));
rightButton.addEventListener("click", () => scrollByAmount(300));

scrollbarThumb.addEventListener("mousedown", function (e) {
  const startX = e.clientX;
  const startLeft = parseInt(window.getComputedStyle(scrollbarThumb).left);

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const newLeft = Math.min(Math.max(0, startLeft + dx), track.clientWidth - scrollbarThumb.clientWidth);

    scrollbarThumb.style.left = `${newLeft}px`;

    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const trackWidth = track.clientWidth - scrollbarThumb.clientWidth;
    const scrollLeft = (newLeft / trackWidth) * scrollWidth;
    scrollContainer.scrollLeft = scrollLeft;
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

window.addEventListener("load", updateThumbPosition);
window.addEventListener("resize", updateThumbPosition);
