"use strict";

//Funktion för att hämta jobb från APIet
async function getMenu() {
    const url = "https://projektdt207g.onrender.com/api/menu";

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    displayMenu(data);
}

//Funktion för att skriva ut alla job
function displayMenu(items) {
    const itemContainerEl = document.querySelector(".itemContainer");

    //Loopa igenom varje jobb och skapa ett HTML-element
    items.forEach(item => {
        const itemElement = document.createElement("div");

        //Lägg till en klass till varje element
        itemElement.classList.add("itemElement");

        itemElement.innerHTML = `
        <p><strong>Namn:</strong> ${item.name}</p>
        <p><strong>Typ:</strong> ${item.type}</p>
        <p><strong>Beskrivning:</strong> ${item.description}</p>
        <p><strong>Pris:</strong> ${item.price}</p>
        <button class="deleteBtn" type="button">Ta bort</button>
        <button class="editBtn" type="button">Redigera</button>
`;

        // Lägg till jobbets ID som ett data-attribut
        itemElement.dataset.itemId = item._id;

        itemContainerEl.appendChild(itemElement);

        //Variabler för knappar
        const deleteBtn = itemElement.querySelector(".deleteBtn");
        const editBtn = itemElement.querySelector(".editBtn");

        //Händelsehanterare för delete-knapp
        deleteBtn.addEventListener("click", () => {
            const token = localStorage.getItem("token");

            if (token) {
                const itemId = itemElement.dataset.itemId;
                deleteItem(itemId);
                //Tar bort jobbet från sidan när användaren klickar på knappen
                itemElement.remove();
            } else {
                console.log("Du måste vara inloggad för att kunna ta bort ett item.")
            }
        });
    });
}

//Funktion för att ta bort ett jobb från APIet
async function deleteItem(itemId) {
    let deleteUrl = `https://projektdt207g.onrender.com/api/menu/${itemId}`;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log("Ett item har tagits bort från databasen.");
        } else {
            console.error("Det gick inte att ta bort ett item från databasen.");
        }
    } catch (error) {
        console.error("Ett fel uppstod vid hämtning av data:", error);
    }
}

//Funktion som gör att funktionerna ovanför kör direkt när sidan laddas in
window.onload = function () {
    getMenu();
};