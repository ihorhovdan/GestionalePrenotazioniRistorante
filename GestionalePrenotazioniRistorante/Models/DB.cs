using Microsoft.Data.SqlClient;

namespace GestionalePrenotazioniRistorante.Models
{
    public class DB
    {
        public static string connectionString = "server=DESKTOP-1I2EFKJ\\SQLEXPRESS; Initial Catalog=Ristorante; Integrated Security=true; TrustServerCertificate=true";

        public static SqlConnection conn = new SqlConnection(connectionString);
    }
}
