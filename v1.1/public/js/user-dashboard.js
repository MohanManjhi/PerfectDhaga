
document.getElementById('menu-button').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar-hidden');
    this.innerHTML = sidebar.classList.contains('sidebar-hidden') ? '<i class="fas fa-bars text-xl"></i>' : '<i class="fas fa-times text-xl"></i>';
});

function showContent(sectionId, link) {
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function(section) {
        section.classList.add('content-hidden');
    });
    document.getElementById(sectionId).classList.remove('content-hidden');

    var links = document.querySelectorAll('nav a');
    links.forEach(function(link) {
        link.classList.remove('active-link');
    });
    link.classList.add('active-link');

    var sidebar = document.getElementById('sidebar');
    sidebar.classList.add('sidebar-hidden');
    document.getElementById('menu-button').innerHTML = '<i class="fas fa-bars text-xl"></i>';
}

// Function to toggle between payment forms
function showForm(paymentMethod) {
const cardForm = document.getElementById('card-form');
const upiForm = document.getElementById('upi-form');
const cardButton = document.getElementById('card-button');
const upiButton = document.getElementById('upi-button');

if (paymentMethod === 'card') {
cardForm.style.display = 'block';
upiForm.style.display = 'none';
cardButton.classList.add('bg-gray-200');
cardButton.classList.remove('bg-gray-100');
upiButton.classList.add('bg-gray-100');
upiButton.classList.remove('bg-gray-200');
} else if (paymentMethod === 'upi') {
cardForm.style.display = 'none';
upiForm.style.display = 'block';
upiButton.classList.add('bg-gray-200');
upiButton.classList.remove('bg-gray-100');
cardButton.classList.add('bg-gray-100');
cardButton.classList.remove('bg-gray-200');
}
}

