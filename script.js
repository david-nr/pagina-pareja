/* ============================================
   ROMANTIC DEDICATION WEBSITE
   JavaScript - Animations & Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas las funcionalidades
    initFloatingHearts();
    initNavigation();
    initScrollAnimations();
    initGalleryLightbox();
    initSmoothScroll();
});

/* ============================================
   CORAZONES FLOTANTES
   ============================================ */
function initFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💕', '💗', '💖', '💝', '❤️', '💘', '💓'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(heart);

        // Remover después de la animación
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }

    // Crear corazones iniciales
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 500);
    }

    // Crear nuevos corazones periódicamente
    setInterval(createHeart, 3000);
}

/* ============================================
   NAVEGACIÓN
   ============================================ */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menú móvil
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cambiar estilo del nav al hacer scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

/* ============================================
   ANIMACIONES AL HACER SCROLL
   ============================================ */
function initScrollAnimations() {
    // Agregar clase animate-on-scroll a elementos
    const animatedElements = document.querySelectorAll(
        '.historia-card, .timeline-item, .gallery-item, .reason-card, .letter-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Observer para detectar cuando entran en viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Agregar delay escalonado para efecto cascada
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   GALERÍA LIGHTBOX
   ============================================ */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = [];

    // Recopilar todas las imágenes
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push(img.src);

        item.addEventListener('click', function () {
            currentIndex = index;
            openLightbox(images[currentIndex]);
        });
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Cerrar con click fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   CONTADOR DE DÍAS JUNTOS (OPCIONAL)
   Si quieres activarlo, descomenta y modifica
   ============================================ */
/*
function initDaysCounter() {
    // Cambia esta fecha por la fecha en que empezaron
    const startDate = new Date('2024-01-15');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const counterElement = document.getElementById('daysCounter');
    if (counterElement) {
        counterElement.textContent = diffDays + ' días';
    }
}
*/
