document.addEventListener('DOMContentLoaded', function () {
    const filterNomeCliente = document.getElementById('filterNomeCliente');
    const filterDataOra = document.getElementById('filterDataOra');
    const inputNomeCliente = document.getElementById('NomeCliente');
    const inputDataOra = document.getElementById('DataOra');

    // Impostazioni iniziali alla carica della pagina
    filterNomeCliente.checked = true;
    filterDataOra.checked = false;
    inputNomeCliente.disabled = false;
    inputDataOra.disabled = true;

    // Funzione per gestire i cambiamenti delle caselle di controllo
    function handleCheckboxChange() {
        if (!filterNomeCliente.checked && !filterDataOra.checked) {
            alert('Devi selezionare almeno una opzione.');
            this.checked = true; // Forza la riconvalida dell'ultima casella deselezionata
        }

        inputNomeCliente.disabled = !filterNomeCliente.checked;
        inputDataOra.disabled = !filterDataOra.checked;
    }

    // Aggiungere event listener a entrambe le caselle di controllo
    filterNomeCliente.addEventListener('change', handleCheckboxChange);
    filterDataOra.addEventListener('change', handleCheckboxChange);
});






document.getElementById('resetButton').addEventListener('click', function() {
    // Ricarica la pagina senza parametri di query
    window.location.href = '/Home/Filter';
});






document.addEventListener('DOMContentLoaded', function () {
    const editModal = document.getElementById('editModal'); // Modale
    const closeModal = document.getElementById('closeModal'); // Bottone per chiudere il modale
    const editForm = document.getElementById('editForm'); // Form di modifica

    // Funzione per aprire il modale con i dati della prenotazione
    function openEditModal(prenotazione) {
        console.log("Dati ricevuti per la prenotazione:", prenotazione); // Debugging dei dati ricevuti

        document.getElementById('editPrenotazioneId').value = prenotazione.PrenotazioneId;
        document.getElementById('editNomeCliente').value = prenotazione.NomeCliente;
        document.getElementById('editNumeroDiPersone').value = prenotazione.NumeroDiPersone;

        // Formatta la data per il campo datetime-local
        const dataOra = prenotazione.DataOra.trim(); // Rimuove spazi indesiderati
        console.log("Data estratta dalla tabella:", dataOra); // Debugging della data grezza

        const formattedDate = formatDateForInput(dataOra);
        console.log("Data formattata per il campo datetime-local:", formattedDate); // Debugging della data formattata

        document.getElementById('editDataOra').value = formattedDate;

        document.getElementById('editNumeroTelefono').value = prenotazione.NumeroTelefono;
        document.getElementById('editEmail').value = prenotazione.Email;
        document.getElementById('editNote').value = prenotazione.Note;

        // Mostra il modale
        editModal.style.display = 'block';
    }

    // Funzione per formattare la data dal formato "DD/MM/YYYY HH:mm:ss" a "YYYY-MM-DDTHH:mm"
    function formatDateForInput(dataOra) {
        const [datePart, timePart] = dataOra.split(' '); // Divide la data dall'ora
        const [day, month, year] = datePart.split('/'); // Estrae giorno, mese, anno
        const time = timePart.substring(0, 5); // Estrae solo "HH:mm" dalla parte dell'ora
        return `${year}-${month}-${day}T${time}`; // Riformatta per il datetime-local
    }

    // Funzione per chiudere il modale
    closeModal.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    // Chiudi il modale cliccando fuori dal contenuto
    window.addEventListener('click', function (event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Aggiungi event listener ai pulsanti di modifica
    document.querySelectorAll('.icon[title="Modifica"]').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            // Estrarre i dati della prenotazione dalla riga della tabella
            const prenotazione = {
                PrenotazioneId: this.getAttribute('href').split('=')[1], // ID estratto dall'URL
                NomeCliente: this.closest('tr').querySelector('td:nth-child(2)').textContent,
                NumeroDiPersone: this.closest('tr').querySelector('td:nth-child(3)').textContent,
                DataOra: this.closest('tr').querySelector('td:nth-child(4)').textContent.trim(), // Assicurati che sia senza spazi
                NumeroTelefono: this.closest('tr').querySelector('td:nth-child(5)').textContent,
                Email: this.closest('tr').querySelector('td:nth-child(6)').textContent,
                Note: this.closest('tr').querySelector('td:nth-child(7)').textContent
            };

            console.log("Prenotazione estratta dalla tabella:", prenotazione); // Debugging dell'intera prenotazione

            // Aprire il modale con i dati estratti
            openEditModal(prenotazione);
        });
    });
});



