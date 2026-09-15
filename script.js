let currentPage = 1;
const totalPages = 10;

const viewport = document.getElementById('viewport');
const pageCounter = document.getElementById('pageCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

// --- GENERATE DOT INDICATORS ---
for (let i = 1; i <= totalPages; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 1) dot.classList.add('active');
  dot.addEventListener('click', () => goToPage(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

// --- PAGE SWITCHING LOGIC ---
function updatePage() {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  const activePage = document.getElementById(`page-${currentPage}`);
  if (activePage) {
    activePage.classList.add('active');
    // Scroll to top when changing to a scrollable page
    activePage.scrollTop = 0;
  }

  // Update counter & dots
  pageCounter.innerText = `${currentPage} / ${totalPages}`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPage - 1);
  });
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
}

function goToPage(pageNum) {
  currentPage = pageNum;
  updatePage();
}

// Button Event Listeners
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);

document.querySelectorAll('.next-trigger').forEach(btn => {
  btn.addEventListener('click', nextPage);
});

// Keyboard Arrow Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});

// --- TOUCH SWIPE FOR MOBILE DEVICES ---
let touchStartX = 0;
let touchEndX = 0;

viewport.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

viewport.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) nextPage();
  if (touchEndX > touchStartX + 50) prevPage();
}, false);

// --- FALLING ROSE PETALS GENERATOR ---
const petalsContainer = document.getElementById('petals-container');
for (let i = 0; i < 18; i++) {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.width = `${Math.random() * 8 + 8}px`;
  petal.style.height = `${Math.random() * 12 + 10}px`;
  petal.style.animationDuration = `${Math.random() * 5 + 6}s`;
  petal.style.animationDelay = `${Math.random() * 5}s`;
  petalsContainer.appendChild(petal);
}

// --- SONG BG AUDIO PLAYER ---
const bgAudio = document.getElementById('bgAudio');
const musicBtn = document.getElementById('musicToggle');
const musicText = document.getElementById('musicText');

function toggleMusic() {
  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      musicText.innerText = "Pause Music";
    }).catch(error => {
      console.log("Audio play error:", error);
    });
  } else {
    bgAudio.pause();
    musicText.innerText = "Play Music";
  }
}

musicBtn.addEventListener('click', toggleMusic);