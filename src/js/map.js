"use strict";

//Skapar en leaflet-karta
let map = L.map('map').setView([59.7159, 16.4179], 13);

//Lägg till ett OpenStreetMap-lager till kartan
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Skapa en marker för att visa platsen
let marker = L.marker([59.7159, 16.4179]).addTo(map);