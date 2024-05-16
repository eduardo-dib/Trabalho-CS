using System.ComponentModel.DataAnnotations;
namespace SistemaGestaoHospitalar.Models;

public class ConsultaRequest
{
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string? PacienteId { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string? MedicoId { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    [RegularExpression(@"^\d{2}/\d{2} \d{2}:\d{2}$", ErrorMessage = "Formato de data e hora inválido. Formato correto: dd/MM HH:mm")]
    public string DataHoraConsulta { get; set; }
    [Required(ErrorMessage = "Este campo é obrigatório!")]
    public string Observacoes { get; set; }
}
