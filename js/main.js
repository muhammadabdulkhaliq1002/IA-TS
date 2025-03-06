// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Check if the link is to a section on the home page
        if (href.startsWith('index.html#')) {
            // Navigate to home page with the section ID
            window.location.href = href;
            return;
        }
        
        // Handle same-page navigation
        const target = document.querySelector(href);
        if (target) {
            // Get navbar height
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            // Get the target's position
            const targetPosition = target.getBoundingClientRect().top;
            
            // Calculate the scroll position accounting for navbar
            const scrollPosition = window.pageYOffset + targetPosition - navbarHeight - 20; // 20px extra padding
            
            // Smooth scroll to the calculated position
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add fade-in animation to sections when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
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

document.addEventListener('DOMContentLoaded', function() {
    // Get all service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Get all submenu links
    const submenuLinks = document.querySelectorAll('.services-sidebar .list-group-item ul li a');
    
    // Get all menu sections
    const menuSections = document.querySelectorAll('.services-sidebar .list-group-item');
    
    // Function to collapse other menus when one is expanded
    function collapseOtherMenus(currentMenu) {
        const allMenus = document.querySelectorAll('.services-sidebar .collapse');
        allMenus.forEach(menu => {
            if (menu !== currentMenu && menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });
    }
    
    // Add event listeners to menu headers
    menuSections.forEach(section => {
        const menuHeader = section.querySelector('a[data-bs-toggle="collapse"]');
        menuHeader.addEventListener('click', function(e) {
            const targetMenu = document.querySelector(this.getAttribute('data-bs-target'));
            collapseOtherMenus(targetMenu);
        });
    });
    
    // Function to show service card and scroll to top
    function showServiceCard(serviceId) {
        // Hide all service cards
        document.querySelectorAll('.service-item').forEach(card => {
            card.classList.remove('active');
        });

        // Show the selected service card
        const selectedCard = document.getElementById(serviceId);
        if (selectedCard) {
            selectedCard.classList.add('active');
            
            // Get navbar height
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            // Get the card's position
            const cardPosition = selectedCard.getBoundingClientRect().top;
            
            // Calculate the scroll position accounting for navbar
            const scrollPosition = window.pageYOffset + cardPosition - navbarHeight - 20; // 20px extra padding
            
            // Smooth scroll to the calculated position
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
    if (serviceItems.length > 0) {
        showServiceCard(serviceItems[0].id);
    }

    // Check if there's a hash in the URL
    if (window.location.hash) {
        // Wait for the page to load completely
        setTimeout(function() {
            const target = document.querySelector(window.location.hash);
            if (target) {
                // Get navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                // Get the target's position
                const targetPosition = target.getBoundingClientRect().top;
                
                // Calculate the scroll position accounting for navbar
                const scrollPosition = window.pageYOffset + targetPosition - navbarHeight - 20; // 20px extra padding
                
                // Smooth scroll to the calculated position
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}); 