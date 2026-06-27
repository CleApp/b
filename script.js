   // ---------- MOBILE MENU TOGGLE ----------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('site-header');

    function toggleHeaderState() {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    toggleHeaderState();
    window.addEventListener('scroll', toggleHeaderState, { passive: true });
    
    function toggleMobileMenu() {
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    }
    if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);
    // Close mobile menu after clicking any nav link inside
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });

    // ---------- TOAST FUNCTION (simulated success state) ----------
    function showToast(message, isError = false) {
      const toastDiv = document.getElementById('toast');
      if (!toastDiv) return;
      toastDiv.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-triangle' : 'fa-check-circle'} text-[#F58220] mr-2"></i> ${message}`;
      toastDiv.classList.remove('opacity-0', 'pointer-events-none');
      toastDiv.classList.add('opacity-100', 'toast-slide');
      setTimeout(() => {
        toastDiv.classList.remove('opacity-100', 'toast-slide');
        toastDiv.classList.add('opacity-0', 'pointer-events-none');
      }, 4000);
    }
    
    // Rental button toast interaction for fleet showcase
    window.showRentalToast = (equipmentName) => {
      showToast(`✅ Rental interest submitted for ${equipmentName}. A DBH specialist will contact you shortly.`);
    };
    
    // Contact Form Handling (Simulated success without page reload)
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim();
        const company = document.getElementById('company')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const service = document.getElementById('serviceNeeded')?.value;
        const message = document.getElementById('message')?.value.trim();
        
        if (!name || !company || !email || !service || !message) {
          showToast("⚠️ Please fill all required fields (Name, Company, Email, Service, Message).", true);
          return;
        }
        if (!email.includes('@') || !email.includes('.')) {
          showToast("❌ Please enter a valid business email address.", true);
          return;
        }
        // Simulate successful request submission
        showToast(`🎉 Thanks ${name}! Your quote request has been received. We'll reply within 1 hour.`);
        form.reset();  // clear form fields
        // (optional) reset any custom states, success simulated
      });
    }
    
    // Metrics Counter (animate on scroll with Intersection Observer)
    const statSpans = [
      { element: document.getElementById('stat1'), target: 99.8, isFloat: true, suffix: '' },
      { element: document.getElementById('stat2'), target: 24, isFloat: false, suffix: '' },
      { element: document.getElementById('stat3'), target: 0, isFloat: false, suffix: '' },
      { element: document.getElementById('stat4'), target: 150, isFloat: false, suffix: '' }
    ];
    
    function animateCounter(span, target, isFloat) {
      if (!span) return;
      let current = 0;
      const step = target / 45;
      const update = () => {
        if (isFloat) {
          current = Math.min(current + step, target);
          span.innerText = Math.floor(current * 10) / 10;
        } else {
          current = Math.min(current + step, target);
          span.innerText = Math.floor(current);
        }
        if (current < target) requestAnimationFrame(update);
        else span.innerText = isFloat ? target : Math.floor(target);
      };
      update();
    }
    
    // Intersection Observer to trigger counters once
    const aboutSection = document.getElementById('about');
    let counted = false;
    if (aboutSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !counted) {
            counted = true;
            statSpans.forEach(stat => {
              if (stat.element) animateCounter(stat.element, stat.target, stat.isFloat);
            });
            observer.unobserve(aboutSection);
          }
        });
      }, { threshold: 0.3 });
      observer.observe(aboutSection);
    } else {
      // fallback if section missing
      statSpans.forEach(stat => { if(stat.element) stat.element.innerText = stat.target; });
    }
    
    // small prefill: default stat display
    if(!counted) {
      statSpans.forEach(stat => { if(stat.element && !parseInt(stat.element.innerText)) stat.element.innerText = '0'; });
    }
    
    // close mobile menu if window resize over md
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });
  