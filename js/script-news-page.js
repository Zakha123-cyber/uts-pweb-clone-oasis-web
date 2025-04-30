const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  mobileMenu.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.style.display = "none";
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
