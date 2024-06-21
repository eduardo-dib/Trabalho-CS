import { useEffect, useState } from "react";
import axios from "axios";
import { Paciente } from "../../../models/Paciente";
import { Medico } from "../../../models/Medico";
import { Consulta } from "../../../models/Consulta";
import { useParams, useNavigate } from "react-router-dom";

function formatDateToCustomFormat(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month} ${hours}:${minutes}`;
}

function ConsultaAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [dataHoraConsulta, setDataHoraConsulta] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);

  useEffect(() => {
 
    if (id) {
      axios
        .get<Consulta>(`http://localhost:5098/hospital/consulta/buscar/${id}`)
        .then((resposta) => {
          const consulta = resposta.data;
          setDataHoraConsulta(new Date(consulta.dataHoraConsulta).toISOString().slice(0, 16)); 
          setPacienteId(consulta.pacienteId);
          setMedicoId(consulta.medicoId);
          setObservacoes(consulta.observacoes);
        })
        .catch((error) => console.error("Erro ao carregar consulta", error));
    }


    axios.get("http://localhost:5098/hospital/listar/paciente")
      .then((response) => setPacientes(response.data))
      .catch((error) => console.error("Erro ao carregar pacientes", error));
    
    axios.get("http://localhost:5098/hospital/listar/medico")
      .then((response) => setMedicos(response.data))
      .catch((error) => console.error("Erro ao carregar médicos", error));
  }, [id]);

  function salvar(e: any) {
    e.preventDefault();
    const consulta: Consulta = {
      id,
      dataHoraConsulta: formatDateToCustomFormat(dataHoraConsulta),
      pacienteId,
      medicoId,
      observacoes,
      pacienteNome: "",
      medicoNome: ""
    };

    axios
      .put(`http://localhost:5098/hospital/consulta/alterar/${id}`, consulta)
      .then((response) => {
        console.log("Consulta alterada com sucesso", response.data);
        navigate("/consulta/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar consulta", error);
      });
  }

  return (
    <div>
      <h1>Alterar Consulta</h1>
      <form onSubmit={salvar}>
        <label>Data e Hora:</label>
        <input
          type="datetime-local"
          value={dataHoraConsulta}
          onChange={(e) => setDataHoraConsulta(e.target.value)}
          required
        />{" "}
        <br />
        <label>Paciente:</label>
        <select value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} required>
          <option value="">Selecione um paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nome}
            </option>
          ))}
        </select>{" "}
        <br />
        <label>Médico:</label>
        <select value={medicoId} onChange={(e) => setMedicoId(e.target.value)} required>
          <option value="">Selecione um médico</option>
          {medicos.map((medico) => (
            <option key={medico.id} value={medico.id}>
              {medico.nome}
            </option>
          ))}
        </select>{" "}
        <br />
        <label>Observações:</label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ConsultaAlterar;
