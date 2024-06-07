import { useState } from "react";
import { Paciente } from "/Users/Pichau/Documents/Dudu/Estudo/Programação/Faculdade/SYT/Trabalho A2/TRABALHO-CSBACKUP4/Trabalho-CS/front/src/models/Paciente";

function PacienteCadastrar() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");

  function cadastrar(e: any) {
    e.preventDefault();
    const paciente: Paciente = {
      nome: nome,
      cpf : cpf,
      genero : genero,
      telefone : telefone,
      descricao : descricao,
    };
    fetch("http://localhost:5098/hospital/cadastrar/paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paciente),
    })
      .then((resposta) => resposta.json())
      .then((pacienteCadastrado: Paciente) => {
        console.log(pacienteCadastrado);
      });
  }

  return (
    <div>
      <h1>Cadastrar Paciente</h1>
      <form onSubmit={cadastrar}>
        <label>Nome:</label>
        <input
          type="text"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />{" "}
        <br />
        <label>Cpf:</label>
        <input
          type="text"
          onChange={(e: any) => setCpf(e.target.value)}
        />{" "}
        <br />
        <label>Gênero:</label>
        <input
          type="text"
          onChange={(e: any) => setGenero(e.target.value)}
        />{" "}
        <br />
        <label>Telefone:</label>
        <input
          type="text"
          onChange={(e: any) => setTelefone(e.target.value)}
        />{" "}
        <br />
        <label>Descrição:</label>
        <input
          type="text"
          onChange={(e: any) => setDescricao(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default PacienteCadastrar;