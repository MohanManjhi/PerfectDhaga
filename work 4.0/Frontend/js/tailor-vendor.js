document.addEventListener('DOMContentLoaded', function() {
    const roleSelect = document.getElementById('role');
    const vendorFields = document.getElementById('vendorFields');
    const tailorFields = document.getElementById('tailorFields');
    const registrationForm = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');
  
    roleSelect.addEventListener('change', function() {
      if (roleSelect.value === 'vendor') {
        vendorFields.classList.remove('hidden');
        tailorFields.classList.add('hidden');
      } else {
        vendorFields.classList.add('hidden');
        tailorFields.classList.remove('hidden');
      }
    });
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault();
      submitButton.innerText = 'Submitting...';
      submitButton.disabled = true;
      setTimeout(() => {
        submitButton.innerText = 'Register';
        submitButton.disabled = false;
        alert('Form submitted successfully!');
      }, 2000);
    });
  });
  