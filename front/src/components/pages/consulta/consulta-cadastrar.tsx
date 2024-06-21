import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paciente } from "../../../models/Paciente";
import { Medico } from "../../../models/Medico";
import { Consulta } from "../../../models/Consulta";

function formatDateToCustomFormat(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month} ${hours}:${minutes}`;
}

function ConsultaCadastrar() {
  const [dataHoraConsulta, setDataHoraConsulta] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios
      .get<Paciente[]>("http://localhost:5098/hospital/listar/paciente")
      .then((response) => setPacientes(response.data))
      .catch((error) => console.error("Erro ao carregar pacientes", error));

    axios
      .get<Medico[]>("http://localhost:5098/hospital/listar/medico")
      .then((response) => setMedicos(response.data))
      .catch((error) => console.error("Erro ao carregar médicos", error));
  }, []);

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const consulta: Consulta = {
      dataHoraConsulta: formatDateToCustomFormat(dataHoraConsulta),
      pacienteId,
      medicoId,
      observacoes,
      pacienteNome: "", 
      medicoNome: "", 
    };

    axios
      .post<Consulta>("http://localhost:5098/hospital/consulta/agendar", consulta)
      .then((response) => {
        console.log("Consulta cadastrada com sucesso", response.data);
        setMensagem("Consulta cadastrada com sucesso!");
        // Limpar os campos após o cadastro
        setDataHoraConsulta("");
        setPacienteId("");
        setMedicoId("");
        setObservacoes("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar consulta", error);
        setMensagem("Erro ao cadastrar consulta. Verifique os dados e tente novamente.");
      });
  }

  return (
    <div>
      <h1>Cadastrar Consulta</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={cadastrar}>
        <label>Data e Hora:</label>
        <input
          type="datetime-local"
          value={dataHoraConsulta}
          onChange={(e) => setDataHoraConsulta(e.target.value)}
          required
        />{" "}
        <br />
        <label>Paciente:</label>
        <select
          value={pacienteId}
          onChange={(e) => setPacienteId(e.target.value)}
          required
        >
          <option value="">Selecione um paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nome}
            </option>
          ))}
        </select>{" "}
        <br />
        <label>Médico:</label>
        <select
          value={medicoId}
          onChange={(e) => setMedicoId(e.target.value)}
          required
        >
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ConsultaCadastrar;
