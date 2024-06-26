import React, { useState } from "react";
import axios from "axios";

function SetorCadastrar() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const setor = {
      nome,
    };

    axios
      .post("http://localhost:5098/hospital/cadastrar/setor", setor)
      .then((response) => {
        console.log("Setor cadastrado com sucesso", response.data);
        setMensagem("Setor cadastrado com sucesso!");
        setNome("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar setor", error);
        setMensagem("Erro ao cadastrar setor. Verifique os dados e tente novamente.");
      });
  }

  return (
    <div>
      <h1>Cadastrar Setor</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={cadastrar}>
        <label>Nome do Setor:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />{" "}
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default SetorCadastrar;