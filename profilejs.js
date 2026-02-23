 // script.js – all functionality combined

    document.addEventListener('DOMContentLoaded', function () {
      // ========== DARK MODE TOGGLE ==========
      const themeToggle = document.getElementById('themeToggle');
      const body = document.body;
      const icon = themeToggle.querySelector('i');

      // check local storage
      if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
      }

      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
          icon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('theme', 'dark');
        } else {
          icon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('theme', 'light');
        }
      });

      // ========== TYPING EFFECT (hero) ==========
      const typedSpan = document.getElementById('typed');
      const phrases = ['Sakitha Sirimanna  ','a developer  ', 'a creator  '];
      let i = 0;
      let j = 0;
      let currentPhrase = [];
      let isDeleting = false;

      function type() {
        if (i < phrases.length) {
          if (!isDeleting && j <= phrases[i].length) {
            currentPhrase = phrases[i].substring(0, j);
            typedSpan.textContent = currentPhrase;
            j++;
          }
          if (isDeleting && j > 0) {
            currentPhrase = phrases[i].substring(0, j - 1);
            typedSpan.textContent = currentPhrase;
            j--;
          }
          if (j === phrases[i].length && !isDeleting) {
            isDeleting = true;
            setTimeout(type, 1500);
            return;
          }
          if (j === 0 && isDeleting) {
            isDeleting = false;
            i = (i + 1) % phrases.length;
          }
        }
        setTimeout(type, isDeleting ? 80 : 120);
      }
      type();

      // ========== MOBILE MENU TOGGLE ==========
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('nav-menu');
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });

      // close menu on link click (mobile)
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });

      // ========== SMOOTH SCROLL + ACTIVE NAV LINK ==========
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');

      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });

        // back-to-top visibility
        const backBtn = document.getElementById('backToTop');
           
        if (window.scrollY > 2) {
          backBtn.classList.add('show');
        } else {
          backBtn.classList.remove('show');
        }
      });

      // back to top click
      document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // smooth scroll for nav links
      navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        });
      });

      // ========== SCROLL ANIMATIONS (fade-in) ==========
      const faders = document.querySelectorAll('.section');
      const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
      const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      }, appearOptions);

      faders.forEach(section => {
        section.classList.add('fade-in');
        appearOnScroll.observe(section);
      });

      // ========== FORM VALIDATION ==========
      const form = document.getElementById('contactForm');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const msgInput = document.getElementById('message');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const msgError = document.getElementById('msgError');
      const successMsg = document.getElementById('formSuccess');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // name validation
        if (nameInput.value.trim() === '') {
          nameError.textContent = 'Name is required';
          isValid = false;
        } else {
          nameError.textContent = '';
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          emailError.textContent = 'Please enter a valid email';
          isValid = false;
        } else {
          emailError.textContent = '';
        }

        // message validation
        if (msgInput.value.trim() === '') {
          msgError.textContent = 'Message cannot be empty';
          isValid = false;
        } else {
          msgError.textContent = '';
        }

        if (isValid) {
          successMsg.textContent = 'Message sent (demo). Thank you!';
          form.reset(); // optional
          setTimeout(() => (successMsg.textContent = ''), 3000);
        }
      });
    });
