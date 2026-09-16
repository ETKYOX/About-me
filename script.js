document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 1;
  const totalPages = 10;

  const bgAudio = document.getElementById('bgAudio');
  const musicToggle = document.getElementById('musicToggle');
  const musicText = document.getElementById('musicText');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageCounter = document.getElementById('pageCounter');
  const dotsContainer = document.getElementById('dotsContainer');

  // --- 1. RENDER NAV DOTS ---
  function renderDots() {
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentPage) dot.classList.add('active');
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  // --- 2. UPDATE PAGE DISPLAY ---
  function updatePage() {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show current page
    const activePage = document.getElementById(`page-${currentPage}`);
    if (activePage) {
      activePage.classList.add('active');
      // Always scroll to top when changing page on mobile/desktop
      activePage.scrollTop = 0;
    }

    // Update Counter & Dots
    pageCounter.textContent = `${currentPage} / ${totalPages}`;
    renderDots();

    // Enable/Disable Nav Buttons
    prevBtn.disabled = currentPage === 1;
    prevBtn.style.opacity = currentPage === 1 ? '0.4' : '1';

    if (currentPage === totalPages) {
      nextBtn.textContent = 'End 🌹';
    } else {
      nextBtn.textContent = 'Next ❯';
    }
  }

  function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      currentPage = pageNumber;
      updatePage();
    }
  }

  // --- 3. EVENT LISTENERS ---
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePage();
    }
  });

  // Handle "Step Inside" trigger button on Page 1
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('next-trigger')) {
      currentPage = 2;
      updatePage();
    }
  });

  // --- 4. MUSIC CONTROLLER ---
  let isPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (!isPlaying) {
      bgAudio.play().then(() => {
        isPlaying = true;
        musicText.textContent = 'Pause Music';
      }).catch(err => {
        console.log('Audio autoplay blocked:', err);
      });
    } else {
      bgAudio.pause();
      isPlaying = false;
      musicText.textContent = 'Play Music';
    }
  });

  // Initialize view
  updatePage();
});