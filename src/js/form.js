"use strict";

//Variabel för formulär
const formEl = document.getElementById("menuForm");

//Händelsehanterare for formulär
formEl.addEventListener("submit", handleSubmit);

//Funktion för att hantera formulär
async function handleSubmit(event) {
    //Förhindra standardsubmit
    event.preventDefault();

    //Hämta värden från inputfälten
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    //Kontroller om input-fälten är ifyllda
    if (!name.trim() || !type.trim() || !description.trim() || !price.trim()) {
        alert("Fyll i alla obligatoriska fält")
        return;
    }

    await addItem(name, type, description, price);

    //Återställ formuläret
    document.getElementById("name").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";

}

//Funktion för att lägga till information till APIet
async function addItem(name, type, description, price) {
    //Länk till APIet
    let postUrl = `https://projektdt207g.onrender.com/api/menu`;
    const token = localStorage.getItem("token");

    let items = {
        name: name,
        type: type,
        description: description,
        price: price
    }

    try {
        const response = await fetch(postUrl, {
            method: "POST",
            headers: {
                //Man måste vara inloggad och ha ett token för att kunna ta bort ett item
                "Authorization": "Bearer " + token,
                "content-type": "Application/json"
            },
            body: JSON.stringify(items)
        });

        if (response.ok) {
            console.log("Ett item har lagts till databasen.");
        } else {
            console.error("Det gick inte att lägga till ett item i databasen.");
        }
    } catch (error) {
        console.error("Ett fel uppstod vid hämtning av data:", error);
    }
}