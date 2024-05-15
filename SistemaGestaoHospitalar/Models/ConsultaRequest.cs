namespace SistemaGestaoHospitalar.Models;

public class ConsultaRequest
{
    public string PacienteId { get; set; }
    public string MedicoId { get; set; }
    public string DataHoraConsulta { get; set; }
    public string Observacoes { get; set; }
}
