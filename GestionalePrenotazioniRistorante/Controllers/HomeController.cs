using GestionalePrenotazioniRistorante.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Data;
using Microsoft.Data.SqlClient;

namespace GestionalePrenotazioniRistorante.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }


        // SELEZIONA TUTTE LE PRENOTAZIONI
        public IActionResult Index()
        {
            List<Prenotazione> prenotazioni = new List<Prenotazione>();
            try
            {
                using (var conn = new SqlConnection(DB.connectionString))
                {
                    conn.Open();
                    var cmd = new SqlCommand("select * FROM Prenotazioni", conn);
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var prenotazione = new Prenotazione()
                            {
                                PrenotazioneId = (int)reader["PrenotazioneId"],
                                NomeCliente = reader["NomeCliente"].ToString(),
                                NumeroDiPersone = (int)reader["NumeroDiPersone"],
                                DataOra = (DateTime)reader["DataOra"],
                                NumeroTelefono = reader["NumeroTelefono"].ToString(),
                                Email = reader["Email"].ToString(),
                                Note = reader["Note"].ToString()
                            };
                            prenotazioni.Add(prenotazione);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il recupero delle prenotazioni.");
                return View("Error");
            }

            return View(prenotazioni);
        }





        // AGGIUNGE LE PRENOTAZIONI
        [HttpPost]
        public IActionResult Add(Prenotazione prenotazione)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var conn = new SqlConnection(DB.connectionString))
                    {
                        conn.Open();
                        var query = "INSERT INTO Prenotazioni (NomeCliente, NumeroDiPersone, DataOra, NumeroTelefono, Email, Note) " +
                                    "VALUES (@NomeCliente, @NumeroDiPersone, @DataOra, @NumeroTelefono, @Email, @Note)";
                        using (var cmd = new SqlCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@NomeCliente", prenotazione.NomeCliente);
                            cmd.Parameters.AddWithValue("@NumeroDiPersone", prenotazione.NumeroDiPersone);
                            cmd.Parameters.AddWithValue("@DataOra", prenotazione.DataOra);
                            cmd.Parameters.AddWithValue("@NumeroTelefono", prenotazione.NumeroTelefono ?? (object)DBNull.Value);
                            cmd.Parameters.AddWithValue("@Email", prenotazione.Email ?? (object)DBNull.Value);
                            cmd.Parameters.AddWithValue("@Note", prenotazione.Note ?? (object)DBNull.Value);

                            cmd.ExecuteNonQuery();
                        }
                    }

                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Errore durante l'aggiunta di una nuova prenotazione.");
                    return View("Error");
                }
            }

            return View("Index",prenotazione); 
        }









        // FILTRO PER CERCARE LE PRENOTAZIONI
        [HttpGet]
        public IActionResult Filter(string nomeCliente, DateTime? dataOra)
        {

            List<Prenotazione> prenotazioniFiltrate = new List<Prenotazione>();
            try
            {
                using (var conn = new SqlConnection(DB.connectionString))
                {
                    conn.Open();
                    var query = @"SELECT * FROM Prenotazioni 
                          WHERE (@NomeCliente IS NULL OR NomeCliente = @NomeCliente) 
                            AND (@DataOra IS NULL OR CONVERT(VARCHAR, DataOra, 112) = CONVERT(VARCHAR, @DataOra, 112))";
                    using (var cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@NomeCliente", nomeCliente ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@DataOra", dataOra ?? (object)DBNull.Value);

                        using (var reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var prenotazione = new Prenotazione()
                                {
                                    PrenotazioneId = (int)reader["PrenotazioneId"],
                                    NomeCliente = reader["NomeCliente"].ToString(),
                                    NumeroDiPersone = (int)reader["NumeroDiPersone"],
                                    DataOra = (DateTime)reader["DataOra"],
                                    NumeroTelefono = reader["NumeroTelefono"].ToString(),
                                    Email = reader["Email"].ToString(),
                                    Note = reader["Note"].ToString()
                                };
                                prenotazioniFiltrate.Add(prenotazione);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante il filtraggio delle prenotazioni.");
                return View("Error");
            }

            ViewBag.NomeCliente = nomeCliente;
            ViewBag.DataOra = dataOra;

            return View("Index", prenotazioniFiltrate);  // Riutilizza la vista Index per visualizzare i risultati filtrati
        }







       



















    }
}








