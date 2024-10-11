// Function to toggle dropdown visibility
function toggleDropdown() {
    document.getElementById("filterDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.filter-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}



//another

let currentIndex = 0;
const reviews = document.querySelectorAll('.review-content');
const totalReviews = reviews.length;

function showReview(index) {
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        if (i === index) {
            review.classList.add('active');
        }
    });
}

function nextReview() {
    currentIndex = (currentIndex + 1) % totalReviews; // Loop back to the start
    showReview(currentIndex);
}

function prevReview() {
    currentIndex = (currentIndex - 1 + totalReviews) % totalReviews; // Loop to the end
    showReview(currentIndex);
}

// Auto-slide every 3 seconds
let autoSlide = setInterval(nextReview, 3000);

// Manual navigation with arrows
document.querySelector('.next').addEventListener('click', () => {
    nextReview();
    resetAutoSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevReview();
    resetAutoSlide();
});

// Reset auto-slide when manually navigating
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextReview, 3000); // Restart auto-slide after manual action
}

// Initially show the first review
showReview(currentIndex);