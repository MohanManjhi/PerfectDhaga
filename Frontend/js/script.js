// app.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevents the form from submitting the traditional way
  
      const role = document.getElementById("role").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Basic validation for username and password
      if (username === "" || password === "") {
        alert("Please fill out both username and password.");
        return;
      }
  
      // Dummy login logic (in a real case, you'd make an API call)
      if (role === "vendor" && username === "vendorUser" && password === "vendorPass") {
        alert("Login successful! Redirecting to Vendor Dashboard...");
        window.location.href = "vendor_home.html"; // Redirect to vendor dashboard
      } else if (role === "admin" || role === "tailor") {
        alert(`Login as ${role} is not yet implemented.`);
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  });
  