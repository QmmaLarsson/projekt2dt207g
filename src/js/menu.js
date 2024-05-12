"use strict";

//Funktion för att hämta jobb från APIet
async function getJobs() {
    const url = "https://projektdt207g.onrender.com/api/menu";

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    displayJobs(data);
}

//Funktion för att skriva ut alla job
function displayJobs(jobs) {
    const jobContainer = document.querySelector(".jobContainer");

    //Loopa igenom varje jobb och skapa ett HTML-element
    jobs.forEach(job => {
        const jobElement = document.createElement("div");

        //Lägg till en klass till varje element
        jobElement.classList.add("jobElement");

        jobElement.innerHTML = `
        <p><strong>Företagsnamn:</strong> ${job.name}</p>
        <p><strong>Titel:</strong> ${job.type}</p>
        <p><strong>Plats:</strong> ${job.description}</p>
        <p><strong>Beskrivning:</strong> ${job.price}</p>
        <button class="deleteBtn" type="button">Ta bort</button>
`;

        // Lägg till jobbets ID som ett data-attribut
        jobElement.dataset.jobId = job._id;

        jobContainer.appendChild(jobElement);

        //Variabel för delete-knapp
        const deleteBtn = jobElement.querySelector(".deleteBtn");

        //Händelsehanterare för delete-knapp
        deleteBtn.addEventListener("click", () => {
            const jobId = jobElement.dataset.jobId;
            deleteJob(jobId);
            //Tar bort jobbet från sidan när användaren klickar på knappen
            jobElement.remove();
        });
    });
}

//Funktion som gör att funktionerna ovanför kör direkt när sidan laddas in
window.onload = function () {
    getJobs();
};