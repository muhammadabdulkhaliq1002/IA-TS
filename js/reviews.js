// Google Places API configuration
const PLACE_ID = 'YOUR_PLACE_ID'; // Replace with your actual Google Place ID
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual Google API key

// Function to fetch reviews from Google Places API
async function fetchGoogleReviews() {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`);
        const data = await response.json();
        
        if (data.result && data.result.reviews) {
            displayReviews(data.result.reviews);
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

// Function to display reviews in the testimonials section
function displayReviews(reviews) {
    const testimonialsContainer = document.querySelector('.testimonials-section .row');
    if (!testimonialsContainer) return;

    // Clear existing testimonials
    testimonialsContainer.innerHTML = '';

    // Display up to 3 most recent reviews
    reviews.slice(0, 3).forEach(review => {
        const rating = review.rating;
        const stars = Array(5).fill('').map((_, index) => 
            `<i class="fas fa-star text-warning me-2"></i>`
        ).join('');

        const reviewHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            ${stars}
                        </div>
                        <p class="card-text">"${review.text}"</p>
                        <div class="d-flex align-items-center">
                            <img src="${review.profile_photo_url}" 
                                 alt="${review.author_name}" 
                                 class="rounded-circle me-3" 
                                 width="50" 
                                 height="50"
                                 onerror="this.src='images/testimonials/default-avatar.png'">
                            <div>
                                <h5 class="mb-0">${review.author_name}</h5>
                                <small class="text-muted">${new Date(review.time * 1000).toLocaleDateString()}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        testimonialsContainer.innerHTML += reviewHTML;
    });
}

// Initialize reviews when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchGoogleReviews();
}); 