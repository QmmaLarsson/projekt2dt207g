"use strict";
//En händelselyssnare med en funktion som körs när DOM-innehållet på sidan har laddats in
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    const loginEl = document.getElementById("login");
    const logoutEl = document.getElementById("logout");
    const adminLinkEl = document.getElementById("adminLink");

    //Om användaren är inloggad och har ett token så döljs login-knappen medan logout-knappen och admin-knappen visas
    if (token) {
        loginEl.style.display = "none";
        logoutEl.style.display = "block";
        adminLinkEl.style.display = "block";
    } else {
        //Om användaren är utloggad så visas login-knappen medan logout-knappen och admin-knappen döljs
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

//Huvudmeny liten skärm
//Variabler
const linksMobile = document.querySelectorAll("#huvudmeny a");

//For each-loop som lägger till en klickhändelse för varje länk
linksMobile.forEach(link => {
    link.addEventListener("click", () => {
        //En if-sats som körs om skärmstorleken är 900px eller mindre
        if (window.innerWidth <= 900) {
            //När en länk klickas på döljs menyn
            document.getElementById("huvudmeny").style.display = "none";
        }
    });
});

//Länkar i huvudmeny
//Variabler
const menuLinks = document.querySelectorAll("nav ul li a");

//For each-loop som lägger till en klickhändelse för varje länk
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        //Tar bort klassen "active" från andra länkar i huvudmenyn
        menuLinks.forEach(otherLink => {
            otherLink.classList.remove("active");
        });
        //Lägger till klassen "active" till en klickade länken i huvudmenyn
        link.classList.add("active");
    });
});

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