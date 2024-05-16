namespace SistemaGestaoHospitalar.Models
{
    public class Consulta
    {
        public string Id { get; set; }
        public string DataHoraConsulta { get; set; }
        public string PacienteId { get; set; }
        public string MedicoId { get; set; }
        public string Observacoes { get; set; }
        public string PacienteNome { get; set; }
        public string MedicoNome { get; set; }

        
        public Paciente Paciente { get; set; }
        public Medico Medico { get; set; }

        public Consulta()
        {
            Id = Guid.NewGuid().ToString();
        }

        public Consulta(string pacienteId, string pacienteNome, string medicoId, string medicoNome, string dataHoraConsulta, string observacoes)
        {
            Id = Guid.NewGuid().ToString();
            PacienteId = pacienteId;
            PacienteNome = pacienteNome;
            MedicoId = medicoId;
            MedicoNome = medicoNome;
            DataHoraConsulta = dataHoraConsulta;
            Observacoes = observacoes;
        }
    }
}
