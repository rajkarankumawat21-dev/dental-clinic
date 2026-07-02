/* Motion Design Intelligence (014): Respects reduced motion preferences */
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // 1. Fade Up Observer
    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.fade-up').forEach((el) => {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.fade-up').forEach((el) => {
            el.classList.add('visible');
        });
    }

    // 2. Number Counter Animation (Stunning UX detail)
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const startCounters = (entries, counterObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, {
        threshold: 0.5
    });

    if (!prefersReducedMotion) {
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach(counter => {
            counter.innerText = counter.getAttribute('data-target');
        });
    }

    // 3. Booking Modal Logic
    const modal = document.getElementById('bookingModal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');

    const openModal = (e) => {
        if(e) e.preventDefault();
        if(modal) modal.classList.add('active');
    };

    const closeModal = () => {
        if(modal) modal.classList.remove('active');
    };

    if(openBtns) openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your appointment request has been received. We will contact you shortly to confirm the time.');
            closeModal();
            bookingForm.reset();
        });
    }

    // 4. Flatpickr Calendar Delight
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#date", {
            minDate: "today",
            dateFormat: "Y-m-d",
            disableMobile: "true"
        });
    }

    // 5. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (moonIcon && sunIcon) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'block';
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'block';
                    sunIcon.style.display = 'none';
                }
            }
        });
    }

    // 6. Navbar Scroll Dynamics
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        if (window.scrollY > 50) header.classList.add('scrolled');
    }

    // 7. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                mobileMenuBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });

        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            });
        });
    }
});
