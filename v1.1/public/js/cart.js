document.getElementById('scroll-left').addEventListener('click', function () {
    const scrollContainer = document.getElementById('horizontal-scroll');
    scrollContainer.scrollBy({
        top: 0,
        left: -150, // Scroll left by 150 pixels
        behavior: 'smooth' // Smooth scroll
    });
});

document.getElementById('scroll-right').addEventListener('click', function () {
    const scrollContainer = document.getElementById('horizontal-scroll');
    scrollContainer.scrollBy({
        top: 0,
        left: 150, // Scroll right by 150 pixels
        behavior: 'smooth' // Smooth scroll
    });
});
