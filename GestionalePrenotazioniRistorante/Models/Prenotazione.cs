namespace GestionalePrenotazioniRistorante.Models
{
    public class Prenotazione
    {
        public int PrenotazioneId { get; set; }
        public string NomeCliente { get; set; }
        public int NumeroDiPersone { get; set; }
        public DateTime DataOra { get; set; }
        public string NumeroTelefono { get; set; }
        public string? Email { get; set; } // Opzionale
        public string? Note { get; set; } // Opzionale
    }

}
