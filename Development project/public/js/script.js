document.addEventListener('DOMContentLoaded', () => {
  const loginSignupBtn = document.getElementById('loginSignupBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLoginSignupBtn = document.getElementById('mobileLoginSignupBtn');
  const roleSelect = document.getElementById('role');
  const registerForm = document.getElementById('registerForm');
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const registerPage = document.getElementById('registerPage');
  const loginPage = document.getElementById('loginPage');
  const passwordInput = document.getElementById('register-password');
  const confirmPasswordInput = document.getElementById('register-confirm-password');
  const passwordHint = document.createElement('div');
  const confirmPasswordHint = document.createElement('div');
  const duplicateHint = document.createElement('div');
  const successPopup = document.getElementById('successPopup');

  // Password hint
  passwordHint.classList.add('text-red-500', 'text-sm', 'mt-2');
  passwordHint.textContent = 'Password must be at least 8 characters long and contain at least one special character.';
  passwordHint.style.display = 'none';
  passwordInput.parentNode.appendChild(passwordHint);

  // Confirm password hint
  confirmPasswordHint.classList.add('text-red-500', 'text-sm', 'mt-2');
  confirmPasswordHint.textContent = 'Passwords do not match.';
  confirmPasswordHint.style.display = 'none';
  confirmPasswordInput.parentNode.appendChild(confirmPasswordHint);

  // Duplicate hint
  duplicateHint.classList.add('text-red-500', 'text-sm', 'mt-2');
  duplicateHint.textContent = 'Email or phone number already exists.';
  duplicateHint.style.display = 'none';
  registerForm.appendChild(duplicateHint);

  // Toggle login modal
  const toggleLoginModal = (show) => {
      loginModal.classList.toggle('hidden', !show);
  };

  // Toggle mobile menu
  const toggleMobileMenu = (show) => {
      mobileMenu.classList.toggle('hidden', !show);
      mobileMenuOverlay.classList.toggle('hidden', !show);
  };

  // Show/hide fields based on role
  const toggleRoleFields = (role) => {
      document.getElementById('userFields').classList.toggle('hidden', role !== 'user');
      document.getElementById('tailorFields').classList.toggle('hidden', role !== 'tailor');
      document.getElementById('vendorFields').classList.toggle('hidden', role !== 'vendor');
  };

  // Validate password
  const validatePassword = (password) => {
      const minLength = 8;
      const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
      return password.length >= minLength && specialCharPattern.test(password);
  };

  // Validate confirm password
  const validateConfirmPassword = (password, confirmPassword) => {
      return password === confirmPassword;
  };

  // Event listeners
  loginSignupBtn.addEventListener('click', () => toggleLoginModal(true));
  closeModalBtn.addEventListener('click', () => toggleLoginModal(false));
  window.addEventListener('click', (e) => {
      if (e.target === loginModal) toggleLoginModal(false);
  });

  mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
  closeMobileMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
  mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));
  mobileLoginSignupBtn.addEventListener('click', () => {
      toggleLoginModal(true);
      toggleMobileMenu(false);
  });

  roleSelect.addEventListener('change', (e) => toggleRoleFields(e.target.value));

  registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Registration submitted');

      const password = passwordInput.value ;
      const confirmPassword = confirmPasswordInput.value;

      let valid = true;

      if (!validatePassword(password)) {
          passwordHint.style.display = 'block';
          valid = false;
      } else {
          passwordHint.style.display = 'none';
      }

      if (!validateConfirmPassword(password, confirmPassword)) {
          confirmPasswordHint.style.display = 'block';
          valid = false;
      } else {
          confirmPasswordHint.style.display = 'none';
      }

      if (valid) {
          // Collect form data
          const formData = new FormData(registerForm);
          const data = Object.fromEntries(formData.entries());

          try {
              const response = await fetch('/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              });

              if (response.ok) {
                  // Display success popup
                  successPopup.classList.remove('hidden');

                  // Redirect to login page after 2 seconds
                  setTimeout(() => {
                      window.location.href = '/login';
                  }, 3000);
              } else {
                  const errorData = await response.json();
                  if (errorData.error === 'duplicate') {
                      duplicateHint.style.display = 'block';
                  } else {
                      console.error('Registration failed');
                  }
              }
          } catch (error) {
              console.error('Error:', error);
          }
      } else {
          console.log('Registration is invalid, please correct errors');
      }
  });

  passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      if (!validatePassword(password)) {
          passwordHint.style.display = 'block';
      } else {
          passwordHint.style.display = 'none';
      }
  });

  confirmPasswordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      if (!validateConfirmPassword(password, confirmPassword)) {
          confirmPasswordHint.style.display = 'block';
      } else {
          confirmPasswordHint.style.display = 'none';
      }
  });

  loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      registerPage.classList.add('hidden');
      loginPage.classList.remove('hidden');
  });

  registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginPage.classList.add('hidden');
      registerPage.classList.remove('hidden');
  });

  // Initialize role fields visibility
  toggleRoleFields(roleSelect.value);
});


// // public/script.js
// document.addEventListener('DOMContentLoaded', () => {
//     const loginSignupBtn = document.getElementById('loginSignupBtn');
//     const loginModal = document.getElementById('loginModal');
//     const closeModalBtn = document.getElementById('closeModalBtn');
//     const mobileMenuBtn = document.getElementById('mobileMenuBtn');
//     const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
//     const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
//     const mobileMenu = document.getElementById('mobileMenu');
//     const mobileLoginSignupBtn = document.getElementById('mobileLoginSignupBtn');
//     const roleSelect = document.getElementById('role');
//     const registerForm = document.getElementById('registerForm');
//     const loginLink = document.getElementById('loginLink');
//     const registerLink = document.getElementById('registerLink');
//     const registerPage = document.getElementById('registerPage');
//     const loginPage = document.getElementById('loginPage');
//     const passwordInput = document.getElementById('register-password');
//     const confirmPasswordInput = document.getElementById('register-confirm-password');
//     const passwordHint = document.createElement('div');
//     const confirmPasswordHint = document.createElement('div');
//     const duplicateHint = document.createElement('div');

//     // Password hint
//     passwordHint.classList.add('text-red-500', 'text-sm', 'mt-2');
//     passwordHint.textContent = 'Password must be at least 8 characters long and contain at least one special character.';
//     passwordHint.style.display = 'none';
//     passwordInput.parentNode.appendChild(passwordHint);

//     // Confirm password hint
//     confirmPasswordHint.classList.add('text-red-500', 'text-sm', 'mt-2');
//     confirmPasswordHint.textContent = 'Passwords do not match.';
//     confirmPasswordHint.style.display = 'none';
//     confirmPasswordInput.parentNode.appendChild(confirmPasswordHint);

//     // Duplicate hint
//     duplicateHint.classList.add('text-red-500', 'text-sm', 'mt-2');
//     duplicateHint.textContent = 'Email or phone number already exists.';
//     duplicateHint.style.display = 'none';
//     registerForm.appendChild(duplicateHint);

//     // Toggle login modal
//     const toggleLoginModal = (show) => {
//         loginModal.classList.toggle('hidden', !show);
//     };

//     // Toggle mobile menu
//     const toggleMobileMenu = (show) => {
//         mobileMenu.classList.toggle('hidden', !show);
//         mobileMenuOverlay.classList.toggle('hidden', !show);
//     };

//     // Show/hide fields based on role
//     const toggleRoleFields = (role) => {
//         document.getElementById('userFields').classList.toggle('hidden', role !== 'user');
//         document.getElementById('tailorFields').classList.toggle('hidden', role !== 'tailor');
//         document.getElementById('vendorFields').classList.toggle('hidden', role !== 'vendor');
//     };

//     // Validate password
//     const validatePassword = (password) => {
//         const minLength = 8;
//         const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
//         return password.length >= minLength && specialCharPattern.test(password);
//     };

//     // Validate confirm password
//     const validateConfirmPassword = (password, confirmPassword) => {
//         return password === confirmPassword;
//     };

//     // Event listeners
//     loginSignupBtn.addEventListener('click', () => toggleLoginModal(true));
//     closeModalBtn.addEventListener('click', () => toggleLoginModal(false));
//     window.addEventListener('click', (e) => {
//         if (e.target === loginModal) toggleLoginModal(false);
//     });

//     mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
//     closeMobileMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
//     mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));
//     mobileLoginSignupBtn.addEventListener('click', () => {
//         toggleLoginModal(true);
//         toggleMobileMenu(false);
//     });

//     roleSelect.addEventListener('change', (e) => toggleRoleFields(e.target.value));

//     registerForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         console.log('Registration submitted');

//         const password = passwordInput.value;
//         const confirmPassword = confirmPasswordInput.value;

//         let valid = true;

//         if (!validatePassword(password)) {
//             passwordHint.style.display = 'block';
//             valid = false;
//         } else {
//             passwordHint.style.display = 'none';
//         }

//         if (!validateConfirmPassword(password, confirmPassword)) {
//             confirmPasswordHint.style.display = 'block';
//             valid = false;
//         } else {
//             confirmPasswordHint.style.display = 'none';
//         }

//         if (valid) {
//             // Collect form data
//             const formData = new FormData(registerForm);
//             const data = Object.fromEntries(formData.entries());

//             try {
//                 const response = await fetch('/register', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(data)
//                 });

//                 if (response.ok) {
//                     // Redirect to login page after successful registration
//                     window.location.href = '/login';
//                 } else {
//                     const errorData = await response.json();
//                     if (errorData.error === 'duplicate') {
//                         duplicateHint.style.display = 'block';
//                     } else {
//                         console.error('Registration failed');
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         } else {
//             console.log('Registration is invalid, please correct errors');
//         }
//     });

//     passwordInput.addEventListener('input', () => {
//         const password = passwordInput.value;
//         if (!validatePassword(password)) {
//             passwordHint.style.display = 'block';
//         } else {
//             passwordHint.style.display = 'none';
//         }
//     });

//     confirmPasswordInput.addEventListener('input', () => {
//         const password = passwordInput.value;
//         const confirmPassword = confirmPasswordInput.value;
//         if (!validateConfirmPassword(password, confirmPassword)) {
//             confirmPasswordHint.style.display = 'block';
//         } else {
//             confirmPasswordHint.style.display = 'none';
//         }
//     });

//     loginLink.addEventListener('click', (e) => {
//         e.preventDefault();
//         registerPage.classList.add('hidden');
//         loginPage.classList.remove('hidden');
//     });

//     registerLink.addEventListener('click', (e) => {
//         e.preventDefault();
//         loginPage.classList.add('hidden');
//         registerPage.classList.remove('hidden');
//     });

//     // Initialize role fields visibility
//     toggleRoleFields(roleSelect.value);
// });

// // // public/script.js
// document.addEventListener('DOMContentLoaded', () => {
//     const loginSignupBtn = document.getElementById('loginSignupBtn');
//     const loginModal = document.getElementById('loginModal');
//     const closeModalBtn = document.getElementById('closeModalBtn');

//     loginSignupBtn.addEventListener('click', () => {
//       loginModal.classList.remove('hidden');
//     });

//     closeModalBtn.addEventListener('click ', () => {
//       loginModal.classList.add('hidden');
//     });

//     window.addEventListener('click', (e) => {
//       if (e.target == loginModal) {
//         loginModal.classList.add('hidden');
//       }
//     });

//     document.getElementById('mobileMenuBtn').addEventListener('click', function() {
//       document.getElementById('mobileMenu').classList.remove('hidden');
//       document.getElementById('mobileMenuOverlay').classList.remove('hidden');
//     });

//     document.getElementById('closeMobileMenuBtn').addEventListener('click', function() {
//       document.getElementById('mobileMenu').classList.add('hidden');
//       document.getElementById('mobileMenuOverlay').classList.add('hidden');
//     });

//     document.getElementById('mobileMenuOverlay').addEventListener('click', function() {
//       document.getElementById('mobileMenu').classList.add('hidden');
//       document.getElementById('mobileMenuOverlay').classList.add('hidden');
//     });

//     document.getElementById('loginSignupBtn').addEventListener('click', function() {
//       document.getElementById('loginModal').classList.remove('hidden');
//     });

//     document.getElementById('closeModalBtn').addEventListener('click', function() {
//       document.getElementById('loginModal').classList.add('hidden');
//     });

//     document.getElementById('mobileLoginSignupBtn').addEventListener('click', function() {
//       document.getElementById('loginModal').classList.remove('hidden');
//       document.getElementById('mobileMenu').classList.add('hidden');
//       document.getElementById('mobileMenuOverlay').classList.add('hidden');
//     });
//   });

