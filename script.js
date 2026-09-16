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
  const particlesContainer = document.getElementById('nature-particles-container');
  const popupContainer = document.getElementById('popup-container');
  const lightningFlash = document.getElementById('lightning-flash');

  let stormInterval = null;

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

  // --- 2. DYNAMIC NATURE PARTICLES ENGINE ---
  function spawnNatureEffect(type) {
    particlesContainer.innerHTML = '';
    if (stormInterval) clearInterval(stormInterval);

    const particleCount = type === 'fog' ? 6 : 25;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.classList.add('particle', `particle-${type}`);

      // Random position & animation delay
      p.style.left = `${Math.random() * 100}vw`;
      p.style.animationDelay = `${Math.random() * 6}s`;
      p.style.animationDuration = `${4 + Math.random() * 6}s`;

      // Specific sizes per nature effect
      if (type === 'petals' || type === 'sakura' || type === 'flowers') {
        const size = 10 + Math.random() * 12;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
      } else if (type === 'snow') {
        const size = 4 + Math.random() * 6;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
      } else if (type === 'cyber') {
        p.style.width = '6px';
        p.style.height = '6px';
      } else if (type === 'fog') {
        const size = 180 + Math.random() * 120;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.top = `${Math.random() * 80}vh`;
      } else if (type === 'stars') {
        const size = 12 + Math.random() * 10;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.top = `${Math.random() * 90}vh`;
      } else if (type === 'blueglow' || type === 'aurora') {
        const size = 8 + Math.random() * 14;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
      }

      particlesContainer.appendChild(p);
    }

    // Trigger Lightning effect if Page 7 (Storm)
    if (type === 'storm') {
      stormInterval = setInterval(() => {
        if (Math.random() > 0.4) {
          lightningFlash.classList.add('flash');
          setTimeout(() => lightningFlash.classList.remove('flash'), 80);
        }
      }, 3500);
    }
  }

  // --- 3. RANDOM GOTHIC POPUPS ENGINE ---
  const popupQuotes = [
    { icon: '🖤', text: 'EYA: "Quiet nights are for silent creation."' },
    { icon: '🌹', text: 'LittleSoul: "Dark romance & late-night code."' },
    { icon: '🎧', text: 'Now Playing: Calming Night Symphony...' },
    { icon: '🌙', text: 'Peak Hours Active: 1:00 AM - 5:00 AM' },
    { icon: '📌', text: 'Secret Fact: EYA loves silent loyal friends.' },
    { icon: '✨', text: 'System: Aesthetics upgraded to 100%' }
  ];

  function spawnRandomPopup() {
    const randomItem = popupQuotes[Math.floor(Math.random() * popupQuotes.length)];
    const popup = document.createElement('div');
    popup.className = 'gothic-popup';

    // Spawn randomly on screen margins
    const randomTop = 15 + Math.random() * 65;
    const randomLeft = 10 + Math.random() * 65;

    popup.style.top = `${randomTop}vh`;
    popup.style.left = `${randomLeft}vw`;
    popup.innerHTML = `<span>${randomItem.icon}</span> <div>${randomItem.text}</div>`;

    popup.addEventListener('click', () => {
      popup.classList.add('fade-out');
      setTimeout(() => popup.remove(), 400);
    });

    popupContainer.appendChild(popup);

    // Auto dismiss after 6s
    setTimeout(() => {
      if (popup.parentNode) {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 400);
      }
    }, 6000);
  }

  // Spawn random popups every 15 seconds
  setInterval(() => {
    if (Math.random() > 0.3) {
      spawnRandomPopup();
    }
  }, 15000);

  // --- 4. UPDATE PAGE DISPLAY ---
  function updatePage() {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show current page
    const activePage = document.getElementById(`page-${currentPage}`);
    if (activePage) {
      activePage.classList.add('active');
      activePage.scrollTop = 0;

      // Trigger Nature particle effect based on active page
      const natureType = activePage.getAttribute('data-nature') || 'petals';
      spawnNatureEffect(natureType);
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

  // --- 5. EVENT LISTENERS ---
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

  // Interactive Wax Seal Popup Trigger
  document.querySelectorAll('.interactive-seal').forEach(seal => {
    seal.addEventListener('click', () => {
      spawnRandomPopup();
    });
  });

  // --- 6. MUSIC CONTROLLER ---
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

  // Reset scroll state on orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      const activePage = document.getElementById(`page-${currentPage}`);
      if (activePage) activePage.scrollTop = 0;
    }, 100);
  });

  // Initialize view
  updatePage();
});