import React, { useState, useEffect } from "react";
import axios from "axios";
import { Setor } from "../../../models/Setor";
import "./medicamento.css";

function MedicamentoCadastrar() {
  const [nome, setNome] = useState("");
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState("");
  const [descricao, setDescricao] = useState("");
  const [setorId, setSetorId] = useState("");
  const [setores, setSetores] = useState<Setor[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios
      .get<Setor[]>("http://localhost:5098/hospital/listar/setor")
      .then((response) => setSetores(response.data))
      .catch((error) => console.error("Erro ao carregar setores", error));
  }, []);

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const medicamento = {
      nome,
      quantidadeDisponivel: Number(quantidadeDisponivel),
      descricao,
      setorId,
    };

    axios
      .post("http://localhost:5098/hospital/cadastrar/medicamento", medicamento)
      .then((response) => {
        console.log("Medicamento cadastrado com sucesso", response.data);
        setMensagem("Medicamento cadastrado com sucesso!");
        setNome("");
        setQuantidadeDisponivel("");
        setDescricao("");
        setSetorId("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar medicamento", error);
        setMensagem(
          "Erro ao cadastrar medicamento. Verifique os dados e tente novamente."
        );
      });
  }

  return (
    <div className="container">
      <h1>Cadastrar Medicamento</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={cadastrar}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label>Quantidade Disponível:</label>
        <input
          type="number"
          value={quantidadeDisponivel}
          onChange={(e) => setQuantidadeDisponivel(e.target.value)}
          required
        />
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <label>Setor:</label>
        <select
          value={setorId}
          onChange={(e) => setSetorId(e.target.value)}
          required
        >
          <option value="">Selecione um setor</option>
          {setores.map((setor) => (
            <option key={setor.id} value={setor.id}>
              {setor.nome}
            </option>
          ))}
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default MedicamentoCadastrar;
