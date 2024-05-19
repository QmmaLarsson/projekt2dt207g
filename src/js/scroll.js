"use strict";
//Header
//Variabler
const headerEl = document.getElementById("header");

//Händelsehanterare
document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        //Om man scrollar ner så att headern inte ligger på toppen av sidan så får headern en bakgrundsfärg
        headerEl.style.backgroundColor = "#816F51";
        headerEl.style.boxShadow = "0px 0px 5px black";
    } else {
        //Om headern ligger på toppen av sidan så har en den ingen bakgrundsfärg
        headerEl.style.backgroundColor = "transparent";
        headerEl.style.boxShadow = "none";
    }
});

//Scrolla till rätt position på sidan vid klick på länk i huvudmenyn
//Variabler
const menuLinkEl = document.getElementById("menuLink");
const aboutLinkEl = document.getElementById("aboutLink");
const contactLinkEl = document.getElementById("contactLink");
const topLinkEl = document.getElementById("topLink");

//Händelsehanterare med funktion som gör att man scrollar på sidan
menuLinkEl.addEventListener("click", (event) => {
    event.preventDefault();
    const menuElement = document.getElementById("menuHeading");
    const offset = 120;
    const elementPosition = menuElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    })
});

aboutLinkEl.addEventListener("click", (event) => {
    event.preventDefault();
    const aboutElement = document.getElementById("aboutHeading");
    const offset = 120;
    const elementPosition = aboutElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    })
});

contactLinkEl.addEventListener("click", (event) => {
    event.preventDefault();
    const contactElement = document.getElementById("contactHeading");
    const offset = 120;
    const elementPosition = contactElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    })
});

topLinkEl.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
});