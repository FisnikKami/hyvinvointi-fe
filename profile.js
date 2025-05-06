// Funktion alustus createTable:n määrittämiseksi
function createTable(data) {
    console.log(data);

    // Etsitään tbody elementti
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    // Loopissa luodaan jokaiselle tietoriville oikeat elementit
    data.forEach((exercise) => {
        const tr = document.createElement('tr');

        // Käyttäjän ID ja nimi
        const td1 = document.createElement('td');
        td1.innerText = exercise.user_id;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerText = exercise.name;
        tr.appendChild(td2);

        // Treeni-info: reps ja weight
        const tdReps = document.createElement('td');
        tdReps.innerText = exercise.reps ?? '-';
        tr.appendChild(tdReps);

        const tdWeight = document.createElement('td');
        tdWeight.innerText = exercise.weight ?? '-';
        tr.appendChild(tdWeight);

        tbody.appendChild(tr);
    });
}

// Funktion alustus fetchData:n määrittämiseksi
async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return await response.json();
}

// Funktion alustus getUsers:n määrittämiseksi
async function getUsers() {
    console.log('Haetaan kaikki käyttäjät ja heidän viimeiset 10 treeniään');
    const url = 'http://127.0.0.1:3000/api/entries';
    const token = localStorage.getItem('token');

    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    try {
        const exercises = await fetchData(url, options);

        // Normalize field names from backend
        const data = exercises.map((ex) => ({
            user_id: ex.uid,
            name: ex.NAME,
            reps: ex.REPS,
            weight: ex.Weight,
        }));

        const lastTenExercises = data.slice(0, 10);
        createTable(lastTenExercises);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Kun DOM valmis, aseta napit
$(document).ready(function () {
    // Kirjaudu ulos
    function logout() {
        alert('Kirjauduttu ulos');
        // Ohjaa kirjautumissivulle
        window.location.href = 'index.html';
    }

    // Logout-nappi
    $('#logoutButton').click(function () {
        logout();
    });

    // Hae data -nappi
    document.getElementById('fetchDataBtn').addEventListener('click', getUsers);
});
