"use strict";

window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
    }
}