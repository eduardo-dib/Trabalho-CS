import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Setor } from "../../../models/Setor";
import { Medicamento } from "../../../models/Medicamento";

function MedicamentoAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState("");
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [setorId, setSetorId] = useState("");
  const [setores, setSetores] = useState<Setor[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios
      .get<Medicamento>(`http://localhost:5098/hospital/buscar/medicamento/${id}`)
      .then((response) => {
        const medicamento = response.data;
        if (medicamento) {
          setNome(medicamento.nome || "");
          setQuantidadeDisponivel(medicamento.quantidadeDisponivel || 0);
          setDescricao(medicamento.descricao || "");
          setSetorId(medicamento.setorId || "");
        }
      })
      .catch((error) => console.error("Erro ao carregar medicamento", error));

    axios
      .get<Setor[]>("http://localhost:5098/hospital/listar/setor")
      .then((response) => setSetores(response.data))
      .catch((error) => console.error("Erro ao carregar setores", error));
  }, [id]);

  function alterar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const medicamento: Medicamento = {
      id,
      nome,
      quantidadeDisponivel,
      descricao,
      setorId,
    };

    axios
      .put(`http://localhost:5098/hospital/atualizar/medicamento/${id}`, medicamento)
      .then((response) => {
        console.log("Medicamento alterado com sucesso", response.data);
        setMensagem("Medicamento alterado com sucesso!");
        navigate("/medicamento/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar medicamento", error);
        setMensagem(
          "Erro ao alterar medicamento. Verifique os dados e tente novamente."
        );
      });
  }

  return (
    <div>
      <h1>Alterar Medicamento</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={alterar}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Quantidade Disponível:</label>
        <input
          type="number"
          value={quantidadeDisponivel}
          onChange={(e) => setQuantidadeDisponivel(Number(e.target.value))}
          required
        />
        <br />
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <br />
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
        <br />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default MedicamentoAlterar;
