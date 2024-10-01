// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const loginSignupBtn = document.getElementById('loginSignupBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
  
    loginSignupBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
    });
  
    closeModalBtn.addEventListener('click ', () => {
      loginModal.classList.add('hidden');
    });
  
    window.addEventListener('click', (e) => {
      if (e.target == loginModal) {
        loginModal.classList.add('hidden');
      }
    });
  
    document.getElementById('mobileMenuBtn').addEventListener('click', function() {
      document.getElementById('mobileMenu').classList.remove('hidden');
      document.getElementById('mobileMenuOverlay').classList.remove('hidden');
    });
  
    document.getElementById('closeMobileMenuBtn').addEventListener('click', function() {
      document.getElementById('mobileMenu').classList.add('hidden');
      document.getElementById('mobileMenuOverlay').classList.add('hidden');
    });
  
    document.getElementById('mobileMenuOverlay').addEventListener('click', function() {
      document.getElementById('mobileMenu').classList.add('hidden');
      document.getElementById('mobileMenuOverlay').classList.add('hidden');
    });
  
    document.getElementById('loginSignupBtn').addEventListener('click', function() {
      document.getElementById('loginModal').classList.remove('hidden');
    });
  
    document.getElementById('closeModalBtn').addEventListener('click', function() {
      document.getElementById('loginModal').classList.add('hidden');
    });
  
    document.getElementById('mobileLoginSignupBtn').addEventListener('click', function() {
      document.getElementById('loginModal').classList.remove('hidden');
      document.getElementById('mobileMenu').classList.add('hidden');
      document.getElementById('mobileMenuOverlay').classList.add('hidden');
    });
  });