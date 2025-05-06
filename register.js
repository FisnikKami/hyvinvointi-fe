document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
  
    registerForm.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      console.log("Form submitted");
  
      const usernameInput = document.getElementById('username');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
  
      // Validate fields
      if (!usernameInput.value || !emailInput.value || !passwordInput.value) {
        alert('Fill in all input fields before registering.');
        return;
      }
  
      const url = 'http://localhost:3000/api/users'; // ✅ Adjust port if backend is different
      const data = {
        username: usernameInput.value,
        password: passwordInput.value,
        email: emailInput.value,
      };
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
  
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
        const responseData = await response.json();
        console.log("Success:", responseData);
        window.location.href = 'index.html'; // ✅ Change to your actual landing page
      } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed. Check console for details.');
      }
    });
  });
  