import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paciente } from "../../../models/Paciente";
import { Medico } from "../../../models/Medico";
import { Consulta } from "../../../models/Consulta";
import "./consulta.css";

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
        setDataHoraConsulta("");
        setPacienteId("");
        setMedicoId("");
        setObservacoes("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar consulta", error);
        const mensagemErro = error.response?.data || "Erro ao cadastrar consulta. Verifique os dados e tente novamente.";
        setMensagem(mensagemErro);
      });
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>Cadastrar Consulta</h1>
        {mensagem && <p className="alert alert-info">{mensagem}</p>}
        <form onSubmit={cadastrar}>
          <div className="mb-3">
            <label className="form-label">Data e Hora:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={dataHoraConsulta}
              onChange={(e) => setDataHoraConsulta(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Paciente:</label>
            <select
              className="form-select"
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
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Médico:</label>
            <select
              className="form-select"
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
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Observações:</label>
            <textarea
              className="form-control"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConsultaCadastrar;
