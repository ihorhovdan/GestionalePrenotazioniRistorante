document.addEventListener('DOMContentLoaded', function () {
    const filterNomeCliente = document.getElementById('filterNomeCliente');
    const filterDataOra = document.getElementById('filterDataOra');
    const inputNomeCliente = document.getElementById('NomeCliente');
    const inputDataOra = document.getElementById('DataOra');

    // Carica lo stato salvato delle checkbox all'avvio
    filterNomeCliente.checked = localStorage.getItem('filterNomeCliente') === 'true';
    filterDataOra.checked = localStorage.getItem('filterDataOra') === 'true';
    inputNomeCliente.disabled = !filterNomeCliente.checked;
    inputDataOra.disabled = !filterDataOra.checked;

    // Funzione per gestire i cambiamenti delle caselle di controllo
    function handleCheckboxChange() {
        if (!filterNomeCliente.checked && !filterDataOra.checked) {
            alert('Devi selezionare almeno una opzione.');
            this.checked = true; // Forza la riconvalida dell'ultima casella deselezionata
        }

        inputNomeCliente.disabled = !filterNomeCliente.checked;
        inputDataOra.disabled = !filterDataOra.checked;

        // Salva lo stato corrente delle checkbox nel localStorage
        localStorage.setItem('filterNomeCliente', filterNomeCliente.checked);
        localStorage.setItem('filterDataOra', filterDataOra.checked);
    }

    // Aggiungere event listener a entrambe le caselle di controllo
    filterNomeCliente.addEventListener('change', handleCheckboxChange);
    filterDataOra.addEventListener('change', handleCheckboxChange);
});







document.getElementById('resetButton').addEventListener('click', function() {
    // Ricarica la pagina senza parametri di query
    window.location.href = '/Home/Filter';
});






document.querySelectorAll(".icon[title='Modifica']").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        // Recupera l'ID della prenotazione
        const prenotazioneId = this.closest("tr").querySelector("td:first-child").innerText;

        // Fai una chiamata AJAX per ottenere i dettagli della prenotazione
        fetch(`/Home/GetPrenotazione?id=${prenotazioneId}`)
            .then(response => response.json())
            .then(prenotazione => {
                // Popola i campi della modale
                document.getElementById("editPrenotazioneId").value = prenotazione.id;
                document.getElementById("editNomeCliente").value = prenotazione.nomeCliente;
                document.getElementById("editNumeroDiPersone").value = prenotazione.numeroDiPersone;
                document.getElementById("editDataOra").value = prenotazione.dataOra;
                document.getElementById("editNumeroTelefono").value = prenotazione.numeroTelefono;
                document.getElementById("editEmail").value = prenotazione.email;
                document.getElementById("editNote").value = prenotazione.note;

                // Mostra la modale
                document.getElementById("editModal").style.display = "block";
            });
    });
});

// Nascondi la modale quando clicchi sulla X
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("editModal").style.display = "none";
});


// Chiudi la modale quando clicchi fuori da essa
window.addEventListener("click", (event) => {
    let modal = document.getElementById("editModal");
    // Verifica se il click è stato effettuato fuori dalla modale
    if (event.target === modal) {
        modal.style.display = "none";
    }
});





function openModal(prenotazioneId) {
    var deleteModal = document.getElementById('deleteConfirmationModal');
    var confirmButton = document.getElementById('confirmDelete');

    // Assicurati di rimuovere qualsiasi vecchio event listener
    confirmButton.removeEventListener('click', confirmDelete);
    confirmButton.addEventListener('click', function () { confirmDelete(prenotazioneId); });

    deleteModal.style.display = 'block';
}

function confirmDelete(prenotazioneId) {
    window.location.href = '/Home/Delete/' + prenotazioneId + '?confirm=true';
}

function closeModal() {
    document.getElementById('deleteConfirmationModal').style.display = 'none';
}




