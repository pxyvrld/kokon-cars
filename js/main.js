// Scroll animations for left and right sliding
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in classes
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Scroll to top button
window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Smooth scrolling for hero button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
        });
    }
});

// Add interactive hover effects for car cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading animation for page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.2;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Cookie Consent & Google Analytics
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    // Sprawdź czy użytkownik już wybrał
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Pokaż banner po 1 sekundzie
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    } else if (cookieConsent === 'accepted') {
        // Załaduj Google Analytics
        loadGoogleAnalytics();
    }
    
    // Akceptacja cookies
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
        loadGoogleAnalytics();
        
        // Animacja zniknięcia
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 400);
    });
    
    // Odrzucenie cookies
    declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
        
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 400);
    });
});

// Funkcja ładująca Google Analytics
function loadGoogleAnalytics() {
    // Pokaż script tag
    const gtagScript = document.getElementById('gtag-script');
    const gtagInit = document.getElementById('gtag-init');
    
    if (gtagScript && gtagInit) {
        gtagScript.style.display = 'block';
        gtagInit.style.display = 'block';
        
        // Wykonaj kod inicjalizujący
        eval(gtagInit.innerHTML);
        
        console.log('Google Analytics załadowane!');
    }
}

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('closeBtn');
    
    // Utwórz overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.id = 'mobileNavOverlay';
    document.body.appendChild(overlay);
    
    // Otwórz menu
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.add('active');
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Zamknij menu
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Zamknij po kliknięciu w link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});