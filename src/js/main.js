"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    const loginEl = document.getElementById("login");
    const logoutEl = document.getElementById("logout");
    const adminLinkEl = document.getElementById("adminLink");

    if (token) {
        loginEl.style.display = "none";
        logoutEl.style.display = "block";
        adminLinkEl.style.display = "inline-block";
    } else {
        loginEl.style.display = "block";
        logoutEl.style.display = "none";
        adminLinkEl.style.display = "none";
    }
});

//Huvudmeny
//Variabler
let openBtnEl = document.getElementById("openmenu");
let closeBtnEl = document.getElementById("closemenu");

//Händelsehanterare
openBtnEl.addEventListener("click", toggleMenu);
closeBtnEl.addEventListener("click", toggleMenu);

//Funktion för att öppna och stänga huvudmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("huvudmeny");

    let style = window.getComputedStyle(navMenuEl);

    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

//Logga ut
//Variabler
const logoutEl = document.getElementById("logout");

//Händelsehanterare
logoutEl.addEventListener("click", handleLogout);

//Funktion för att logga ut
function handleLogout() {
    //Ta bort token från localStorage
    localStorage.removeItem("token");

    //Omdirigera till inloggningssidan
    window.location.href = "login.html";
}