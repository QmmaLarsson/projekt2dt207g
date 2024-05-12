"use strict";

//Logga in redan registrerad användare
//Variabler
const loginFormEl = document.getElementById("loginForm");

//Händelsehanterare
loginFormEl.addEventListener("submit", handleLogin);

//Funktion för att hantera formulär
async function handleLogin(event) {
    //Förhindra standardsubmit
    event.preventDefault();

    //Hämta värden från inputfälten
    const usernameEl = document.getElementById("username").value;
    const passwordEl = document.getElementById("password").value;

    // Validera input
    if (!usernameEl.trim() || !passwordEl.trim()) {
        alert("Vänligen fyll i alla fält")
        return;
    }

        // Validera input
        if (usernameEl.trim().length < 4) {
            alert("Användarnamnet måste vara minst fyra tecken långt");
            return;
        }
    
        if (passwordEl.trim().length < 6) {
            alert("Lösenordet måste vara minst sex tecken långt");
            return;
        }

    await login(usernameEl, passwordEl);

    //Återställ formuläret
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

//Funktion för att lägga till information till APIet
async function login(username, password) {
    //Länk till APIet
    const url = "https://projektdt207g.onrender.com/api/login";

    let user = {
        username: username,
        password: password,
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if( response.status === 200) {
        const token = data.response.token;
        console.log(token);
        localStorage.setItem("token", token);
        window.location.href = "admin.html";
    } else {
        alert("Fel användarnamn eller lösenord");
    }
}
