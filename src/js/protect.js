"use strict";

//Funktion som körs när innehållet på sidan har laddats in
window.onload = init;

function init() {
    //If-sats som kontrollerar om det inte finns något token i localStorage
    if (!localStorage.getItem("token")) {
        //Om token saknas dirigeras användaren till login-sidan
        window.location.href = "login.html";
    }
}