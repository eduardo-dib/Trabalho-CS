export interface Consulta {
    id?: string;
    dataHoraConsulta: string;
    pacienteId: string;
    medicoId: string;
    observacoes: string;
    pacienteNome?: string;
    medicoNome?: string;
  }
  