/* ==========================================
   PREMIUM PORTFOLIO JAVASCRIPT
   Modern Interactions & Animations
   ========================================== */

   'use strict';

   // Global variables
   let isLoaded = false;
   let currentTheme = 'light';
   let ticking = false;
   
   // Initialize when DOM is loaded
   document.addEventListener('DOMContentLoaded', function() {
       initializeApp();
   });
   
   // Main initialization function
   function initializeApp() {
       initPreloader();
       initTheme();
       initCursor();
       initNavigation();
       initTypingAnimation();
       initParticles();
       initScrollAnimations();
       initMagneticElements();
       initFormHandler();
       initBackToTop();
       initTabs();
       initProjectFilters();
       initCounterAnimations();
       initSkillBars();
       initMobileMenu();
       
       // Mark as loaded
       isLoaded = true;
   }
   
   // Preloader
   function initPreloader() {
       const preloader = document.querySelector('.preloader');
       const progressBar = document.querySelector('.loading-progress');
       
       if (!preloader) return;
       
       let progress = 0;
       const interval = setInterval(() => {
           progress += Math.random() * 15;
           
           if (progress >= 100) {
               progress = 100;
               clearInterval(interval);
               
               setTimeout(() => {
                   preloader.classList.add('fade-out');
                   document.body.style.overflow = 'visible';
                   
                   setTimeout(() => {
                       preloader.style.display = 'none';
                   }, 500);
               }, 500);
           }
           
           progressBar.style.width = progress + '%';
       }, 100);
   }
   
   // Theme Management
   function initTheme() {
       const themeButton = document.getElementById('theme-button');
       const savedTheme = localStorage.getItem('theme') || 'light';
       
       setTheme(savedTheme);
       
       if (themeButton) {
           themeButton.addEventListener('click', toggleTheme);
       }
   }
   
   function setTheme(theme) {
       currentTheme = theme;
       document.documentElement.setAttribute('data-theme', theme);
       localStorage.setItem('theme', theme);
       
       // Update particle colors if particles exist
       if (window.particleSystem) {
           window.particleSystem.updateColors(theme);
       }
   }
   
   function toggleTheme() {
       const newTheme = currentTheme === 'light' ? 'dark' : 'light';
       setTheme(newTheme);
       
       // Add ripple effect
       createRippleEffect(event.target);
   }
   
   // Custom Cursor
   function initCursor() {
       const cursor = document.querySelector('.custom-cursor');
       const cursorDot = document.querySelector('.cursor-dot');
       const cursorRing = document.querySelector('.cursor-ring');
       
       if (!cursor || window.innerWidth < 1024) return;
       
       let mouseX = 0, mouseY = 0;
       let ringX = 0, ringY = 0;
       
       document.addEventListener('mousemove', (e) => {
           mouseX = e.clientX;
           mouseY = e.clientY;
           
           cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
       });
       
       // Smooth ring animation
       function animateRing() {
           ringX += (mouseX - ringX) * 0.15;
           ringY += (mouseY - ringY) * 0.15;
           
           cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
           requestAnimationFrame(animateRing);
       }
       animateRing();
       
       // Cursor states
       const interactiveElements = document.querySelectorAll('a, button, .magnetic, input, textarea');
       
       interactiveElements.forEach(element => {
           element.addEventListener('mouseenter', () => {
               cursor.classList.add('cursor-hover');
           });
           
           element.addEventListener('mouseleave', () => {
               cursor.classList.remove('cursor-hover');
           });
       });
   }
   
   // Navigation
   function initNavigation() {
       const nav = document.querySelector('.main-nav');
       const navLinks = document.querySelectorAll('.menu a');
       const sections = document.querySelectorAll('section[id]');
       
       // Navbar scroll effect
       let lastScrollY = window.scrollY;
       
       window.addEventListener('scroll', () => {
           if (!ticking) {
               requestAnimationFrame(() => {
                   const currentScrollY = window.scrollY;
                   
                   if (currentScrollY > 100) {
                       nav.classList.add('scrolled');
                   } else {
                       nav.classList.remove('scrolled');
                   }
                   
                   // Hide/show navbar on scroll
                   if (currentScrollY > lastScrollY && currentScrollY > 500) {
                       nav.style.transform = 'translateY(-100%)';
                   } else {
                       nav.style.transform = 'translateY(0)';
                   }
                   
                   lastScrollY = currentScrollY;
                   ticking = false;
               });
               ticking = true;
           }
       });
       
       // Active section highlighting
       const observerOptions = {
           threshold: 0.3,
           rootMargin: '-100px 0px -100px 0px'
       };
       
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   navLinks.forEach(link => {
                       link.parentElement.classList.remove('active');
                       if (link.getAttribute('href') === `#${entry.target.id}`) {
                           link.parentElement.classList.add('active');
                       }
                   });
               }
           });
       }, observerOptions);
       
       sections.forEach(section => observer.observe(section));
       
       // Smooth scrolling
       navLinks.forEach(link => {
           link.addEventListener('click', (e) => {
               e.preventDefault();
               const targetId = link.getAttribute('href');
               const targetSection = document.querySelector(targetId);
               
               if (targetSection) {
                   const offsetTop = targetSection.offsetTop - 80;
                   window.scrollTo({
                       top: offsetTop,
                       behavior: 'smooth'
                   });
               }
           });
       });
   }
   
   // Mobile Menu
   function initMobileMenu() {
       const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
       const menuContainer = document.querySelector('.menu-container');
       const menuOverlay = document.querySelector('.menu-overlay');
       const menuLinks = document.querySelectorAll('.menu a');
       
       if (!mobileMenuBtn) return;
       
       mobileMenuBtn.addEventListener('click', toggleMobileMenu);
       menuOverlay.addEventListener('click', closeMobileMenu);
       
       menuLinks.forEach(link => {
           link.addEventListener('click', closeMobileMenu);
       });
       
       function toggleMobileMenu() {
           mobileMenuBtn.classList.toggle('active');
           menuContainer.classList.toggle('active');
           menuOverlay.classList.toggle('active');
           document.body.classList.toggle('menu-open');
       }
       
       function closeMobileMenu() {
           mobileMenuBtn.classList.remove('active');
           menuContainer.classList.remove('active');
           menuOverlay.classList.remove('active');
           document.body.classList.remove('menu-open');
       }
   }
   
   // Typing Animation
   function initTypingAnimation() {
       const typedTextElement = document.querySelector('.typed-text');
       const cursor = document.querySelector('.typing-cursor');
       
       if (!typedTextElement) return;
       
       const phrases = [
           'Creative Developer',
           'UI/UX Designer',
           'Frontend Specialist',
           'Problem Solver'
       ];
       
       let phraseIndex = 0;
       let charIndex = 0;
       let isDeleting = false;
       
       function typeText() {
           const currentPhrase = phrases[phraseIndex];
           
           if (isDeleting) {
               typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
               charIndex--;
           } else {
               typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
               charIndex++;
           }
           
           let typeSpeed = isDeleting ? 50 : 100;
           
           if (!isDeleting && charIndex === currentPhrase.length) {
               typeSpeed = 2000;
               isDeleting = true;
           } else if (isDeleting && charIndex === 0) {
               isDeleting = false;
               phraseIndex = (phraseIndex + 1) % phrases.length;
               typeSpeed = 500;
           }
           
           setTimeout(typeText, typeSpeed);
       }
       
       // Start typing animation after a delay
       setTimeout(typeText, 1000);
   }
   
   // Particle System
   function initParticles() {
       const canvas = document.getElementById('particle-canvas');
       if (!canvas) return;
       
       const ctx = canvas.getContext('2d');
       const particles = [];
       const particleCount = 50;
       
       // Resize canvas
       function resizeCanvas() {
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;
       }
       
       resizeCanvas();
       window.addEventListener('resize', resizeCanvas);
       
       // Particle class
       class Particle {
           constructor() {
               this.reset();
               this.y = Math.random() * canvas.height;
           }
           
           reset() {
               this.x = Math.random() * canvas.width;
               this.y = -10;
               this.size = Math.random() * 3 + 1;
               this.speedX = (Math.random() - 0.5) * 0.5;
               this.speedY = Math.random() * 1 + 0.5;
               this.opacity = Math.random() * 0.5 + 0.2;
           }
           
           update() {
               this.x += this.speedX;
               this.y += this.speedY;
               
               if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
                   this.reset();
               }
           }
           
           draw() {
               ctx.save();
               ctx.globalAlpha = this.opacity;
               ctx.fillStyle = currentTheme === 'dark' ? '#6366f1' : '#8b5cf6';
               ctx.beginPath();
               ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
               ctx.fill();
               ctx.restore();
           }
       }
       
       // Create particles
       for (let i = 0; i < particleCount; i++) {
           particles.push(new Particle());
       }
       
       // Animation loop
       function animate() {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           
           particles.forEach(particle => {
               particle.update();
               particle.draw();
           });
           
           requestAnimationFrame(animate);
       }
       
       animate();
       
       // Store reference for theme updates
       window.particleSystem = {
           updateColors: (theme) => {
               // Particles will use the updated theme color in next frame
           }
       };
   }
   
   // Scroll Animations
   function initScrollAnimations() {
       const animatedElements = document.querySelectorAll('.section-title, .section-tag, .hero-content > *, .about-visual, .about-content, .skill-category, .project-card, .experience-card, .contact-info, .contact-form');
       
       const observerOptions = {
           threshold: 0.1,
           rootMargin: '0px 0px -50px 0px'
       };
       
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   entry.target.style.opacity = '1';
                   entry.target.style.transform = 'translateY(0)';
                   observer.unobserve(entry.target);
               }
           });
       }, observerOptions);
       
       animatedElements.forEach(element => {
           element.style.opacity = '0';
           element.style.transform = 'translateY(30px)';
           element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
           observer.observe(element);
       });
   }
   
   // Magnetic Elements
   function initMagneticElements() {
       const magneticElements = document.querySelectorAll('.magnetic');
       
       magneticElements.forEach(element => {
           element.addEventListener('mousemove', (e) => {
               const rect = element.getBoundingClientRect();
               const x = e.clientX - rect.left - rect.width / 2;
               const y = e.clientY - rect.top - rect.height / 2;
               
               const moveX = x * 0.15;
               const moveY = y * 0.15;
               
               element.style.transform = `translate(${moveX}px, ${moveY}px)`;
           });
           
           element.addEventListener('mouseleave', () => {
               element.style.transform = 'translate(0, 0)';
           });
       });
   }
   
   // Form Handler
// Form Handler
function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Form data
        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value
        };

        // EmailJS SEND
        emailjs
            .send("service_567vj6r", "template_yv4pi3b", formData)
            .then(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#10b981';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    showNotification('Message sent successfully!', 'success');
                }, 2000);
            })
            .catch(() => {
                submitBtn.innerHTML = 'Failed! Try Again';
                submitBtn.style.background = '#ef4444';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);

                showNotification('Failed to send message!', 'error');
            });
    });

    // Focus effect
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const inputLine = input.nextElementSibling;

        input.addEventListener('focus', () => {
            if (inputLine && inputLine.classList.contains('input-line')) {
                inputLine.style.width = '100%';
            }
        });

        input.addEventListener('blur', () => {
            if (inputLine && inputLine.classList.contains('input-line')) {
                inputLine.style.width = '0';
            }
        });
    });
}

// Initialize everything after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    initFormHandler();
});

   // Back to Top
   function initBackToTop() {
       const backToTopBtn = document.querySelector('.back-to-top');
       
       if (!backToTopBtn) return;
       
       window.addEventListener('scroll', () => {
           if (window.scrollY > 500) {
               backToTopBtn.classList.add('visible');
           } else {
               backToTopBtn.classList.remove('visible');
           }
       });
       
       backToTopBtn.addEventListener('click', () => {
           window.scrollTo({
               top: 0,
               behavior: 'smooth'
           });
       });
   }
   
   // Tabs Functionality
   function initTabs() {
       const tabButtons = document.querySelectorAll('.tab-btn');
       const tabPanels = document.querySelectorAll('.tab-panel');
       
       tabButtons.forEach(button => {
           button.addEventListener('click', () => {
               const targetTab = button.getAttribute('data-tab');
               
               // Remove active class from all buttons and panels
               tabButtons.forEach(btn => btn.classList.remove('active'));
               tabPanels.forEach(panel => panel.classList.remove('active'));
               
               // Add active class to clicked button and corresponding panel
               button.classList.add('active');
               const targetPanel = document.getElementById(targetTab);
               if (targetPanel) {
                   targetPanel.classList.add('active');
               }
           });
       });
   }
   
   // Project Filters
   function initProjectFilters() {
       const filterButtons = document.querySelectorAll('.filter-btn');
       const projectCards = document.querySelectorAll('.project-card');
       
       filterButtons.forEach(button => {
           button.addEventListener('click', () => {
               const filter = button.getAttribute('data-filter');
               
               // Update active button
               filterButtons.forEach(btn => btn.classList.remove('active'));
               button.classList.add('active');
               
               // Filter projects
               projectCards.forEach(card => {
                   const category = card.getAttribute('data-category');
                   
                   if (filter === 'all' || category === filter) {
                       card.style.display = 'block';
                       card.style.opacity = '0';
                       card.style.transform = 'translateY(20px)';
                       
                       setTimeout(() => {
                           card.style.opacity = '1';
                           card.style.transform = 'translateY(0)';
                       }, 100);
                   } else {
                       card.style.opacity = '0';
                       card.style.transform = 'translateY(20px)';
                       
                       setTimeout(() => {
                           card.style.display = 'none';
                       }, 300);
                   }
               });
           });
       });
   }
   
   // Counter Animations
   function initCounterAnimations() {
       const counters = document.querySelectorAll('.stat-number[data-count]');
       
       const observerOptions = {
           threshold: 0.5
       };
       
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   animateCounter(entry.target);
                   observer.unobserve(entry.target);
               }
           });
       }, observerOptions);
       
       counters.forEach(counter => observer.observe(counter));
       
       function animateCounter(element) {
           const target = parseInt(element.getAttribute('data-count'));
           const duration = 2000;
           const stepTime = 50;
           const steps = duration / stepTime;
           const increment = target / steps;
           let current = 0;
           
           const timer = setInterval(() => {
               current += increment;
               element.textContent = Math.floor(current);
               
               if (current >= target) {
                   element.textContent = target;
                   clearInterval(timer);
               }
           }, stepTime);
       }
   }
   
   // Skill Bars Animation
   function initSkillBars() {
       const skillBars = document.querySelectorAll('.skill-progress[data-width]');
       
       const observerOptions = {
           threshold: 0.5
       };
       
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   const width = entry.target.getAttribute('data-width');
                   entry.target.style.width = width + '%';
                   observer.unobserve(entry.target);
               }
           });
       }, observerOptions);
       
       skillBars.forEach(bar => observer.observe(bar));
   }
   
   // Utility Functions
   function createRippleEffect(element) {
       const ripple = document.createElement('div');
       const rect = element.getBoundingClientRect();
       const size = Math.max(rect.width, rect.height);
       
       ripple.style.cssText = `
           position: absolute;
           border-radius: 50%;
           background: rgba(255, 255, 255, 0.3);
           transform: scale(0);
           animation: ripple 0.6s linear;
           width: ${size}px;
           height: ${size}px;
           left: ${event.clientX - rect.left - size / 2}px;
           top: ${event.clientY - rect.top - size / 2}px;
       `;
       
       element.style.position = 'relative';
       element.style.overflow = 'hidden';
       element.appendChild(ripple);
       
       setTimeout(() => {
           ripple.remove();
       }, 600);
   }
   
   function showNotification(message, type = 'info') {
       const notification = document.createElement('div');
       notification.className = `notification notification--${type}`;
       notification.textContent = message;
       
       notification.style.cssText = `
           position: fixed;
           top: 20px;
           right: 20px;
           padding: 1rem 1.5rem;
           background: ${type === 'success' ? '#10b981' : '#6366f1'};
           color: white;
           border-radius: 0.5rem;
           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
           z-index: 10000;
           transform: translateX(100%);
           transition: transform 0.3s ease;
       `;
       
       document.body.appendChild(notification);
       
       setTimeout(() => {
           notification.style.transform = 'translateX(0)';
       }, 100);
       
       setTimeout(() => {
           notification.style.transform = 'translateX(100%)';
           setTimeout(() => {
               notification.remove();
           }, 300);
       }, 3000);
   }
   
   function debounce(func, wait) {
       let timeout;
       return function executedFunction(...args) {
           const later = () => {
               clearTimeout(timeout);
               func(...args);
           };
           clearTimeout(timeout);
           timeout = setTimeout(later, wait);
       };
   }
   
   function throttle(func, limit) {
       let inThrottle;
       return function() {
           const args = arguments;
           const context = this;
           if (!inThrottle) {
               func.apply(context, args);
               inThrottle = true;
               setTimeout(() => inThrottle = false, limit);
           }
       }
   }
   
   // Add CSS for ripple animation
   const style = document.createElement('style');
   style.textContent = `
       @keyframes ripple {
           to {
               transform: scale(4);
               opacity: 0;
           }
       }
       
       .cursor-hover .cursor-ring {
           transform: translate(-50%, -50%) scale(1.5) !important;
           opacity: 1 !important;
       }
       
       .notification {
           animation: slideInRight 0.3s ease;
       }
       
       @keyframes slideInRight {
           from {
               transform: translateX(100%);
           }
           to {
               transform: translateX(0);
           }
       }
   `;
   document.head.appendChild(style);
   
   // Performance optimization
   window.addEventListener('load', () => {
       // Remove loading classes
       document.body.classList.add('loaded');
       
       // Initialize performance-heavy features only after load
       initAdvancedAnimations();
   });
   
   function initAdvancedAnimations() {
       // Add more complex animations that might impact performance
       const cards = document.querySelectorAll('.project-card, .experience-card, .skill-category');
       
       cards.forEach(card => {
           card.addEventListener('mousemove', (e) => {
               const rect = card.getBoundingClientRect();
               const x = e.clientX - rect.left;
               const y = e.clientY - rect.top;
               
               const centerX = rect.width / 2;
               const centerY = rect.height / 2;
               
               const rotateX = (y - centerY) / 10;
               const rotateY = (centerX - x) / 10;
               
               card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
           });
           
           card.addEventListener('mouseleave', () => {
               card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
           });
       });
   }
   
   // Error handling
   window.addEventListener('error', (e) => {
       console.error('An error occurred:', e.error);
   });
   
   // Handle page visibility changes
   document.addEventListener('visibilitychange', () => {
       if (document.hidden) {
           // Pause animations when page is hidden
           document.body.style.animationPlayState = 'paused';
       } else {
           // Resume animations when page is visible
           document.body.style.animationPlayState = 'running';
       }
   });
   
   console.log('Premium Portfolio initialized successfully! 🚀');