// ===== INITIALIZATIONS =====
document.addEventListener('DOMContentLoaded', function() {
  // AOS Library for scroll animations
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-quad'
  });

  // Typed.js alternative (manual typing effect)
  const roles = ['Civil Engineer', 'Project Manager', 'Site Supervision Expert', 'Trust & Excellence'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElement = document.getElementById('typed');
  
  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
      return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }
  
  if (typedElement) typeEffect();

  // === Navbar scroll effect & active link ===
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
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
  });
  
  // === Mobile Menu Toggle ===
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = hamburger?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
  
  // === Smooth scrolling for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // === Custom Cursor (desktop only) ===
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (window.innerWidth >= 1024 && cursorDot && cursorOutline) {
    cursorDot.style.display = 'block';
    cursorOutline.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      cursorOutline.style.transform = `translate(${e.clientX - 17}px, ${e.clientY - 17}px)`;
    });
    
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '0.6';
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .btn-primary, .btn-outline');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = `scale(1.5)`;
        cursorOutline.style.borderColor = '#dbb95b';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = `scale(1)`;
        cursorOutline.style.borderColor = '#c9a03d';
      });
    });
  }
  
  // === Form Submission Simulation (non-refresh with animation) ===
  const form = document.getElementById('siteForm');
  const feedback = document.getElementById('formFeedback');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const message = document.getElementById('message')?.value;
      
      if (!name || !email || !message) {
        feedback.textContent = 'Please fill in all fields.';
        feedback.style.color = '#e74c3c';
        setTimeout(() => { feedback.textContent = ''; }, 3000);
        return;
      }
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call (replace with actual backend later)
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      feedback.textContent = `Thank you ${name}! Your message has been received. I'll get back to you soon.`;
      feedback.style.color = '#27ae60';
      form.reset();
      
      setTimeout(() => {
        feedback.textContent = '';
      }, 5000);
      
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Optional: You can integrate actual email service here (Formspree, etc.)
    });
  }
  
  // === Intersection Observer for additional card animations ===
  const cards = document.querySelectorAll('.service-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
  
  // Update observer on load to trigger visible cards
  setTimeout(() => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  }, 200);
  
  // === Scroll Indicator Fade Effect ===
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
      }
    });
  }
  
  // === Parallax-like effect on hero (subtle) ===
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < 600) {
      hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
});