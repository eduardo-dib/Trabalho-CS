import React, { useState } from "react";
import axios from "axios";
import "./paciente.css";

function PacienteCadastrar() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const paciente = {
      nome,
      cpf,
      telefone,
    };

    axios
      .post("http://localhost:5098/hospital/paciente/cadastrar", paciente)
      .then((response) => {
        console.log("Paciente cadastrado com sucesso", response.data);
        setMensagem("Paciente cadastrado com sucesso!");
        setNome("");
        setCpf("");
        setTelefone("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar paciente", error);
        setMensagem("Erro ao cadastrar paciente. Verifique os dados e tente novamente.");
      });
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>Cadastrar Paciente</h1>
        {mensagem && <p className="alert alert-info">{mensagem}</p>}
        <form onSubmit={cadastrar}>
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <input
              type="text"
              className="form-control"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <input
              type="text"
              className="form-control"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
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

export default PacienteCadastrar;
