
let currentLocation = ''; // Track the currently displayed location

// Function to toggle the map visibility and load a location
function toggleMap(location) {
    const iframe = document.getElementById('map');
    if (iframe.style.display === 'block' && currentLocation === location) {
        iframe.style.display = 'none';  // Hide the map if it's visible and the same location is clicked
    } else {
        iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.093213045054!2d75.8702731738552!3d22.72477652737847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd14cce078f7%3A0x5c5373a9e276a9ee!2sSGSITS%20Front%20Gate!5e0!3m2!1sen!2sin!4v1727812891613!5m2!1sen!2sin`;
        iframe.style.display = 'block';  // Show the map with the new location
        currentLocation = location;      // Update the current location
    }
}

document.addEventListener('click', function (event) {
    const iframe = document.getElementById('map');
    // Check if the click is outside the iframe and buttons
    if (!iframe.contains(event.target) && !event.target.matches('button')) {
        iframe.style.display = 'none'; // Hide the map
        currentLocation = ''; // Reset current location
        iframe.src = ""; // Reset the iframe src
    }
});



const loginSignupBtn = document.getElementById('loginSignupBtn');
const loginModal = document.getElementById('loginModal');
const closeModalBtn = document.getElementById('closeModalBtn');

loginSignupBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    loginModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target == loginModal) {
        loginModal.classList.add('hidden');
    }
});

document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    document.getElementById('mobileMenu').classList.remove('hidden');
    document.getElementById('mobileMenuOverlay').classList.remove('hidden');
});

document.getElementById('closeMobileMenuBtn').addEventListener('click', function () {
    document.getElementById('mobileMenu').classList.add('hidden');
    document.getElementById('mobileMenuOverlay').classList.add('hidden');
});

document.getElementById('mobileMenuOverlay').addEventListener('click', function () {
    document.getElementById('mobileMenu').classList.add('hidden');
    document.getElementById('mobileMenuOverlay').classList.add('hidden');
});

document.getElementById('loginSignupBtn').addEventListener('click', function () {
    document.getElementById('loginModal').classList.remove('hidden');
});

document.getElementById('closeModalBtn').addEventListener('click', function () {
    document.getElementById('loginModal').classList.add('hidden');
});

document.getElementById('mobileLoginSignupBtn').addEventListener('click', function () {
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('mobileMenu').classList.add('hidden');
    document.getElementById('mobileMenuOverlay').classList.add('hidden');
});
