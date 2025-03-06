// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Check if the link is to a section on the home page
        if (href.startsWith('index.html#')) {
            window.location.href = href;
            return;
        }
        
        // Handle same-page navigation
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top;
            const scrollPosition = window.pageYOffset + targetPosition - navbarHeight - 20;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling with debounce
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    let isSubmitting = false;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        isSubmitting = true;
        
        try {
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } finally {
            isSubmitting = false;
        }
    });
}

// Optimized intersection observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    fadeInObserver.observe(section);
});

// Debounced navbar background change on scroll
let scrollTimeout;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
            navbar?.classList.add('navbar-scrolled');
        } else {
            navbar?.classList.remove('navbar-scrolled');
        }
    });
});

// Mobile menu close on link click
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const menuToggle = document.getElementById('navbarNav');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            bsCollapse.hide();
        }
    });
});

// Services page functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const submenuLinks = document.querySelectorAll('.services-sidebar .list-group-item ul li a');
    const menuSections = document.querySelectorAll('.services-sidebar .list-group-item');
    
    if (!serviceItems.length || !submenuLinks.length || !menuSections.length) return;
    
    // Function to collapse other menus when one is expanded
    function collapseOtherMenus(currentMenu) {
        document.querySelectorAll('.services-sidebar .collapse').forEach(menu => {
            if (menu !== currentMenu && menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });
    }
    
    // Add event listeners to menu headers
    menuSections.forEach(section => {
        const menuHeader = section.querySelector('a[data-bs-toggle="collapse"]');
        menuHeader?.addEventListener('click', function(e) {
            const targetMenu = document.querySelector(this.getAttribute('data-bs-target'));
            if (targetMenu) {
                collapseOtherMenus(targetMenu);
            }
        });
    });
    
    // Function to show service card and scroll to top
    function showServiceCard(serviceId) {
        document.querySelectorAll('.service-item').forEach(card => {
            card.classList.remove('active');
        });

        const selectedCard = document.getElementById(serviceId);
        if (selectedCard) {
            selectedCard.classList.add('active');
            
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const cardPosition = selectedCard.getBoundingClientRect().top;
            const scrollPosition = window.pageYOffset + cardPosition - navbarHeight - 20;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Add click event listeners to submenu items
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('href').substring(1);
            showServiceCard(serviceId);
        });
    });
    
    // Show first service card by default
    showServiceCard(serviceItems[0].id);

    // Handle hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top;
                const scrollPosition = window.pageYOffset + targetPosition - navbarHeight - 20;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}); 