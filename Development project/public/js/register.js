document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
  
    // Simulate an API call
    setTimeout(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
      alert('Account Created Successfully!');
    }, 2000);
  });
  