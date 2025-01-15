document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn')) {
            e.preventDefault(); // Previene l'invio automatico del form

            var form = e.target.closest('form'); // Ottiene il form più vicino
            if (!form.checkValidity()) {
                form.reportValidity(); // Mostra i messaggi di errore di validazione HTML5
                return; // Interrompe l'esecuzione se il form non è valido
            }

            var confirmationBox = document.getElementById('confirmationBox');
            var message = document.getElementById('confirmationMessage');

            // Cambia il messaggio in base al pulsante premuto
            if (e.target.classList.contains('add-btn')) {
                message.textContent = 'Prenotazione aggiunta con successo!';
            } else if (e.target.classList.contains('edit-btn')) {
                message.textContent = 'Modifiche salvate con successo!';
            }

            // Visualizza il riquadro di conferma
            confirmationBox.style.display = 'flex';
            confirmationBox.style.zIndex = '1000'; // Assicurati che sia sopra gli altri elementi

            // Avvia l'animazione della spunta
            var path = document.querySelector('.confirmation-checkmark svg path');
            path.style.animation = 'none'; // Resetta l'animazione
            setTimeout(() => path.style.animation = 'checkmark 0.5s ease forwards', 10); // Riavvia l'animazione

            setTimeout(function () {
                confirmationBox.style.display = 'none';
                form.submit(); // Invia il form
            }, 1300); // Mostra il messaggio di successo per 1.3 secondi
        }
    });
});
