// script.js
const form = document.getElementById('terminologyForm');

// Functie om nieuwe terminologie toe te voegen
async function addTerminology(formDataObject) {
    try {
        const response = await fetch('/terminology', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het toevoegen van de terminologie.');
        }

        alert('Terminologie succesvol toegevoegd!');
        form.reset(); // Reset het formulier nadat het is ingediend
    } catch (error) {
        console.error(error.message);
        alert('Er is een fout opgetreden. Probeer het later opnieuw.');
    }
}

// Event listener voor het indienen van het formulier
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Voorkom standaardgedrag van het formulier

    const formData = new FormData(form);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    await addTerminology(formDataObject);
});

// Functie om een nieuw kennisitem toe te voegen
async function addKnowledgeItem(formDataObject) {
    try {
        const response = await fetch('/knowledgeitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het toevoegen van het kennisitem.');
        }

        alert('Kennisitem succesvol toegevoegd!');
        // Als het toevoegen succesvol is, kun je hier eventueel andere acties uitvoeren, zoals het bijwerken van de weergave van kennisitems.
    } catch (error) {
        console.error(error.message);
        alert('Er is een fout opgetreden. Probeer het later opnieuw.');
    }
}
