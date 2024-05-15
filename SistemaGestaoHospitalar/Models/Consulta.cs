namespace SistemaGestaoHospitalar.Models;

public class Consulta
{
    public string Id { get; set; }
    public string DataHoraConsulta { get; set; }
    public Paciente Paciente { get; set; }
    public string PacienteId { get; set; }
    public Medico Medico { get; set; }
    public string MedicoId { get; set; }
    public string Observacoes { get; set; }
    public AppDbContext context { get; set; }

    public Consulta(string pacienteId, string dataHoraConsulta, string medicoId, string observacoes)
    {
        Paciente = context.Pacientes.FirstOrDefault(s => s.Id == pacienteId);
        Medico = context.Medicos.FirstOrDefault(s => s.Id == medicoId);
        DataHoraConsulta = dataHoraConsulta;
        Observacoes = observacoes;

        // Set the patient and doctor names based on the retrieved objects
        PacienteNome = Paciente?.Nome;
        MedicoNome = Medico?.Nome;
    }

    public Consulta()
    {
        Id = Guid.NewGuid().ToString();
    }

    // Add properties for patient and doctor names
    public string PacienteNome { get; set; }
    public string MedicoNome { get; set; }
}
