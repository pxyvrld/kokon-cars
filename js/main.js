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

// Loading animation for page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll-to-top visibility + parallax effect for hero section (throttled via rAF)
const scrollTopBtn = document.querySelector('.scroll-top');
const hero = document.querySelector('.hero');
let scrollTicking = false;

function handleScroll() {
    const scrolled = window.scrollY;

    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', scrolled > 300);
    }

    if (hero) {
        hero.style.transform = `translateY(${scrolled * -0.2}px)`;
    }

    scrollTicking = false;
}

window.addEventListener('scroll', function() {
    if (!scrollTicking) {
        requestAnimationFrame(handleScroll);
        scrollTicking = true;
    }
}, { passive: true });

// Scroll to top button click
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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
const GA_MEASUREMENT_ID = 'G-XTFYMH2EHD';

function loadGoogleAnalytics() {
    if (window.dataLayer) return;

    window.dataLayer = [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
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
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    });

    // Zamknij menu
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Zamknij po kliknięciu w link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

// Privacy Policy Modal
document.addEventListener('DOMContentLoaded', function() {
    const privacyModal = document.getElementById('privacyModal');
    const privacyLinkCookie = document.getElementById('privacyLinkCookie');
    const privacyLinkFooter = document.getElementById('privacyLinkFooter');
    const privacyClose = document.getElementById('privacyClose');
    
    // Otwórz modal
    function openPrivacyModal(e) {
        e.preventDefault();
        privacyModal.classList.add('show');
        privacyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Zamknij modal
    function closePrivacyModal() {
        privacyModal.classList.remove('show');
        setTimeout(() => {
            privacyModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Event listeners
    if (privacyLinkCookie) {
        privacyLinkCookie.addEventListener('click', openPrivacyModal);
    }
    
    if (privacyLinkFooter) {
        privacyLinkFooter.addEventListener('click', openPrivacyModal);
    }
    
    if (privacyClose) {
        privacyClose.addEventListener('click', closePrivacyModal);
    }
    
    // Zamknij po kliknięciu poza modal
    privacyModal.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            closePrivacyModal();
        }
    });
    
    // Zamknij po ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && privacyModal.classList.contains('show')) {
            closePrivacyModal();
        }
    });
});