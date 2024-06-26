"use strict";
//Funktion som körs direkt när sidan laddas in
window.onload = function () {
    getMenu();
};

//Funktion för att hämta meny från APIet
async function getMenu() {
    const url = "https://projektdt207g.onrender.com/api/menu";

    const response = await fetch(url);

    const data = await response.json();

    displayMenu(data);
}

//Funktion för att skriva ut alla items
function displayMenu(items) {
    //Loopa igenom varje item och skapa ett HTML-element
    items.forEach(item => {
        const itemElement = document.createElement("div");

        //Lägg till en klass till varje element
        itemElement.classList.add("itemElement");

        itemElement.innerHTML = `
        <p><span class="name"><strong>${item.name}</strong> </span></p>
        <p><span class="description"><em>${item.description}</em></span></p>
        <p><span class="price"><strong>${item.price}</strong></span><strong>kr</strong></p>
        <button class="deleteBtn" type="button">TA BORT</button>
        <button class="editBtn" type="button">REDIGERA</button>
`;

        // Lägg till varje items ID som ett data-attribut
        itemElement.dataset.itemId = item._id;

        // Hitta rätt div baserat på objektets typ och lägg till item-elementet där
        const container = document.getElementById(item.type);
        if (container) {
            container.appendChild(itemElement);
        } else {
            console.error(`Div för typ ${item.type} finns inte.`);
        }

        //Knappar (delete och redigera)
        //Variabler
        const deleteBtn = itemElement.querySelector(".deleteBtn");
        const editBtn = itemElement.querySelector(".editBtn");

        //Dölj delete-knappen och redigera-knappen om användaren inte är inloggad och har ett token
        const token = localStorage.getItem("token");
        if (!token) {
            deleteBtn.style.display = "none";
            editBtn.style.display = "none";
        }

        //Händelsehanterare för radera-knappen
        deleteBtn.addEventListener("click", () => {
            const token = localStorage.getItem("token");

            //Man måste vara inloggad och ha ett token för att kunna radera ett item
            if (token) {
                const itemId = itemElement.dataset.itemId;
                deleteItem(itemId);
                //Tar bort item från sidan när användaren klickar på knappen
                itemElement.remove();
            } else {
                console.log("Du måste vara inloggad för att kunna ta bort ett item.")
            }
        });

        //Händelsehanterare för redigera-knappen
        editBtn.addEventListener("click", () => {
            const token = localStorage.getItem("token");

            //Man måste vara inloggad och ha ett token för att kunna uppdatera ett item
            if (token) {
                //Variabler för värdena i itemElement
                const nameEl = itemElement.querySelector(".name");
                const descriptionEl = itemElement.querySelector(".description");
                const priceEl = itemElement.querySelector(".price");

                //Skapa inputfält för att möjliggöra redigering
                nameEl.innerHTML = `<input type="text" class="editName" value="${item.name}">`;
                descriptionEl.innerHTML = `<input type="text" class="editDescription" value="${item.description}">`;
                priceEl.innerHTML = `<input type="text" class="editPrice" value="${item.price}">`;

                //Spara-knapp
                //Variabler
                const saveBtn = document.createElement("button");
                saveBtn.textContent = "SPARA";
                saveBtn.classList.add("saveBtn");
                saveBtn.type = "button";

                //Händelselyssnare med funktion som körs vid klick på knapp
                saveBtn.addEventListener("click", () => {
                    const newItem = {
                        name: itemElement.querySelector(".editName").value,
                        description: itemElement.querySelector(".editDescription").value,
                        price: itemElement.querySelector(".editPrice").value
                    };

                    updateItem(itemElement.dataset.itemId, newItem)
                        .then(() => {
                            //Uppdatera sidan med de nya värdena
                            nameEl.textContent = newItem.name;
                            descriptionEl.textContent = newItem.description;
                            priceEl.textContent = newItem.price;

                            //Ta bort spara-knappen
                            saveBtn.remove();
                        })
                        .catch(error => {
                            console.error("Ett fel uppdtod vid uppdatering av item.", error);

                            //Återställ sidan med de gamla värdena om uppdateringen misslyckas
                            nameEl.textContent = item.name;
                            descriptionEl.textContent = item.description;
                            priceEl.textContent = item.price;

                            //Ta bort spara-knappen
                            saveBtn.remove();
                        });

                });
                itemElement.appendChild(saveBtn);

            } else {
                console.log("Du måste vara inloggad för att kunna redigera ett item.");
            }
        });
    });
}

//Funktion för att ta bort ett item från databasen
async function deleteItem(itemId) {
    let deleteUrl = `https://projektdt207g.onrender.com/api/menu/${itemId}`;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                //Man måste vara inloggad och ha ett token för att kunna ta bort ett item
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
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

//Funktion för att uppdatera ett item i databasen
async function updateItem(itemId, newItem) {
    let updateUrl = `https://projektdt207g.onrender.com/api/menu/${itemId}`;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(updateUrl, {
            method: "PUT",
            headers: {
                //Man måste vara inloggad och ha ett token för att kunna uppdatera ett item
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });

        if (response.ok) {
            console.log("Ett item har uppdaterats i databasen.");
        } else {
            console.error("Det gick inte att uppdatera ett item i databasen.");
        }
    } catch (error) {
        console.error("Ett fel uppstod vid hämtning av data:", error);
    }
}

//Knappar för att bläddra mellan olika matkategorier
//Variabler
const savouryBtnEl = document.getElementById("savouryBtn");
const sweetBtnEl = document.getElementById("sweetBtn");
const drinkBtnEl = document.getElementById("drinkBtn");

//Händelselyssnare
savouryBtnEl.addEventListener("click", () => openMenu(event, "savoury"));
sweetBtnEl.addEventListener("click", () => openMenu(event, "sweet"));
drinkBtnEl.addEventListener("click", () => openMenu(event, "drink"));

//Funktion
function openMenu(event, foodCategory) {
    let i, tabContent, tabs;

    //Dölj allt innehåll i flikarna
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    //Ta bort "active" från alla flikar
    tabs = document.getElementsByClassName("tabs");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    //Visa innehåll för vald flik
    document.getElementById(foodCategory).style.display = "block"

    //Markerar den valda knappen som "active"
    event.currentTarget.classList.add("active");
}