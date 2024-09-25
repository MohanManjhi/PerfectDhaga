document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submit-btn');
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in...';
  
    // Simulate API call
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Sign in';
      alert('Signed in successfully!');
    }, 2000);
  });
  
  document.getElementById('google-login').addEventListener('click', function () {
    alert('Google sign-in clicked!');
  });

  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = "Signing in...";
  
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign in";
  });

  
  
  