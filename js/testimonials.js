// Lazy load testimonials when they come into view
const testimonialsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadTestimonials();
            testimonialsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Function to load testimonials
async function loadTestimonials() {
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (!testimonialsSection) return;

    // Show loading state
    testimonialsSection.querySelector('.row').innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;

    try {
        // Simulate API call delay (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample testimonials data (replace with actual API data)
        const testimonials = [
            {
                name: "John Doe",
                text: "Excellent service! The team was very professional and completed the work on time.",
                rating: 5,
                date: "2024-03-01"
            },
            {
                name: "Jane Smith",
                text: "Great experience with the installation. Very knowledgeable team.",
                rating: 5,
                date: "2024-02-28"
            },
            {
                name: "Mike Johnson",
                text: "Best in the business! Highly recommended for all your needs.",
                rating: 5,
                date: "2024-02-25"
            }
        ];

        displayTestimonials(testimonials);
    } catch (error) {
        console.error('Error loading testimonials:', error);
        testimonialsSection.querySelector('.row').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Failed to load testimonials. Please try again later.</p>
            </div>
        `;
    }
}

// Function to display testimonials
function displayTestimonials(testimonials) {
    const testimonialsContainer = document.querySelector('.testimonials-section .row');
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = testimonials.map(testimonial => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        ${Array(5).fill('').map((_, i) => 
                            `<i class="fas fa-star ${i < testimonial.rating ? 'text-warning' : 'text-muted'} me-2"></i>`
                        ).join('')}
                    </div>
                    <p class="card-text">"${testimonial.text}"</p>
                    <div class="d-flex align-items-center">
                        <img src="images/testimonials/default-avatar.png" 
                             alt="${testimonial.name}" 
                             class="rounded-circle me-3" 
                             width="50" 
                             height="50">
                        <div>
                            <h5 class="mb-0">${testimonial.name}</h5>
                            <small class="text-muted">${new Date(testimonial.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize testimonials observer
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        testimonialsObserver.observe(testimonialsSection);
    }
}); 