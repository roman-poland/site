// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Smooth scroll to element
function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.mobile-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add scroll animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
});

// Before/After slider
const baSlider = document.getElementById('baSlider');
if (baSlider) {
    const baAfter = baSlider.querySelector('.ba-after');
    const baSliderBar = baSlider.querySelector('.ba-slider');

    function updateSlider(e) {
        const rect = baSlider.getBoundingClientRect();
        let x = e.clientX - rect.left;

        if (e.type.includes('touch')) {
            x = e.touches[0].clientX - rect.left;
        }

        x = Math.max(0, Math.min(x, rect.width));
        const percentage = (x / rect.width) * 100;

        baAfter.style.clipPath = `inset(0 0 0 ${100 - percentage}%)`;
        baSliderBar.style.left = percentage + '%';
    }

    baSlider.addEventListener('mousemove', updateSlider);
    baSlider.addEventListener('touchmove', updateSlider);
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        // Close other items
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.borderBottomColor = 'rgba(245, 243, 240, 0.2)';
    } else {
        nav.style.borderBottomColor = 'rgba(245, 243, 240, 0.1)';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.mobile-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
});
