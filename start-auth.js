import './style.css';
import { fetchData } from './fetch.js';

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan käyttäjä');

  const url = 'https://hyvinvointi-be-production.up.railway.app/api/users'; // Muutettu Azure -> Local

  const form = document.querySelector('.create_user_form');
  const username = form.querySelector('input[name=username]').value;

  const data = {
    username: username,
    password: form.querySelector('input[name=password]').value,
    email: form.querySelector('input[name=email]').value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetchData(url, options).then((data) => {
    console.log(data);
  });
});

// haetaan nappi josta haetaan formi ja logataan sisään
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  const url = 'https://hyvinvointi-be-production.up.railway.app/api/auth/login'; // Muutettu Azure -> Local

  const form = document.querySelector('.login_form');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetchData(url, options).then((data) => {
    console.log(data);
    console.log(data.token);
    localStorage.setItem('token', data.token);
    if (data.token == undefined) {
      alert('unauth user: käyttäjänimi tai salasana ei oikein');
    } else {
      alert(data.message);
      localStorage.setItem('name', data.user.username);
      window.location.href = 'start-api-harjoituspohja.html';
    }

    logResponse('loginResponse', `localStorage set with token value: ${data.token}`);
  });
});

// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', async () => {
  console.log('Testataan TOKENIA ja haetaan käyttäjän tiedot');

  const url = 'https://hyvinvointi-be-production.up.railway.app/api/auth/me'; // Muutettu Azure -> Local
  const muntokeni = localStorage.getItem('token');
  console.log('Tämä on haettu LocalStoragesta', muntokeni);

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + muntokeni, // Korjattu Authorization header
    },
  };

  console.log(options);

  fetchData(url, options).then((data) => {
    console.log(data);
    logResponse('meResponse', `Authorized user info: ${JSON.stringify(data)}`);
  });
});

// Haetaan nappi josta tyhjennetään localStorage
const clear = document.querySelector('#clearButton');
clear.addEventListener('click', clearLocalStorage);

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}

// Apufunktio, Tyhjennä local storage
function clearLocalStorage() {
  localStorage.removeItem('token');
  logResponse('clearResponse', 'localStorage cleared!');
}
