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
