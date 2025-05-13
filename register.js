document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  
  // Varmistetaan, että lomake löytyy ja on ladattu
  if (!registerForm) {
    console.error('Register form not found!');
    return;
  }

  registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    console.log("Form submitted");

    // Haetaan kenttien arvot
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Kenttien tarkistus
    if (!usernameInput.value || !emailInput.value || !passwordInput.value) {
      alert('Fill in all input fields before registering.');
      return;
    }

    // Määritellään URL ja data, joka lähetetään serverille
    const url = 'https://hyvinvointi-be-production.up.railway.app/api/users';
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
    };

    // Määritellään POST-pyynnön asetukset
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      // Lähetetään POST-pyyntö
      const response = await fetch(url, options);

      // Tarkistetaan vastaus
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      // Käsitellään onnistunut vastaus
      const responseData = await response.json();
      console.log("Success:", responseData);

      // Siirrytään onnistumisen jälkeen etusivulle
      window.location.href = 'index.html';  // Muokkaa tarpeen mukaan

    } catch (error) {
      // Virheiden käsittely
      console.error('Error during registration:', error.message);
      alert('Registration failed. Check console for details.');
    }
  });
});
