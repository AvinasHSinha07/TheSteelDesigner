document.getElementById("year").textContent = new Date().getFullYear();

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlElement.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  htmlElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  themeIcon.textContent = theme === "light" ? "🌙" : "☀️";
}

const portfolioGrid = document.getElementById("portfolioGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const imageIds = [
  "1487958449943-2429e8be8625",
  "1487958449943-2429e8be8625",
  "1487958449943-2429e8be8625",
  "1487958449943-2429e8be8625",
  "1487958449943-2429e8be8625",
  "1487958449943-2429e8be8625",
  "1487958449943-2429e8be8625",
  "1487958449943-2429e8be8625",
];

let loadedCount = 0;
const batchSize = 6;

function loadItems() {
  const limit = Math.min(loadedCount + batchSize, imageIds.length);

  for (let i = loadedCount; i < limit; i++) {
    const imgId = imageIds[i];
    const stableImgUrl = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=600&q=80`;
    const largeImgUrl = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=1200&q=90`;

    const div = document.createElement("div");
    div.className = "project-item reveal";
    div.onclick = function () {
      openLightbox(largeImgUrl);
    };

    div.innerHTML = `
          <img src="${stableImgUrl}" alt="Project ${i + 1}" loading="lazy">
          <div class="project-overlay">
            <div class="project-ref">REF: 24-00${i + 1}</div>
            <div class="project-title">Industrial Steel Structure</div>
          </div>
        `;
    portfolioGrid.appendChild(div);
  }

  loadedCount = limit;
  if (loadedCount >= imageIds.length) {
    loadMoreBtn.style.display = "none";
  }

  checkReveal();
}

loadItems();
loadMoreBtn.addEventListener("click", loadItems);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("active");
}
function closeLightbox() {
  lightbox.classList.remove("active");
  setTimeout(() => (lightboxImg.src = ""), 300);
}
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function checkReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  for (let i = 0; i < reveals.length; i++) {
    const elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", checkReveal);

checkReveal();
