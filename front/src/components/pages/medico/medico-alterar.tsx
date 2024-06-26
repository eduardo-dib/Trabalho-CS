import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Medico } from "../../../models/Medico";
import { Setor } from "../../../models/Setor";

function MedicoAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [crm, setCrm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [setorId, setSetorId] = useState("");
  const [setores, setSetores] = useState<Setor[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get<Medico>(`http://localhost:5098/hospital/buscar/medico/${id}`)
        .then((response) => {
          const medico = response.data;
          setNome(medico.nome);
          setGenero(medico.genero);
          setEspecialidade(medico.especialidade);
          setCrm(medico.crm.toString());
          setTelefone(medico.telefone);
          setDescricao(medico.descricao);
          setSetorId(medico.setorId);
        })
        .catch((error) => console.error("Erro ao carregar médico", error));
    }

    axios
      .get<Setor[]>("http://localhost:5098/hospital/listar/setor")
      .then((response) => setSetores(response.data))
      .catch((error) => console.error("Erro ao carregar setores", error));
  }, [id]);

  function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const medico: Medico = {
        nome,
        genero,
        especialidade,
        crm: Number(crm),
        telefone,
        descricao,
        setorId,
      };

    axios
      .put(`http://localhost:5098/hospital/atualizar/medico/${id}`, medico)
      .then((response) => {
        console.log("Médico alterado com sucesso", response.data);
        navigate("/medico/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar médico", error);
      });
  }

  return (
    <div>
      <h1>Alterar Médico</h1>
      <form onSubmit={salvar}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />{" "}
        <br />
        <label>Gênero:</label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        >
          <option value="">Selecione o gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>{" "}
        <br />
        <label>Especialidade:</label>
        <input
          type="text"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          required
        />{" "}
        <br />
        <label>CRM:</label>
        <input
          type="text"
          value={crm}
          onChange={(e) => setCrm(e.target.value.replace(/\D/g, "").substring(0, 6))}
          maxLength={6}
          required
        />{" "}
        <br />
        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          maxLength={14}
          required
        />{" "}
        <br />
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />{" "}
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
        </select>{" "}
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default MedicoAlterar;
