import React, { useEffect, useState } from "react";
import axios from "axios";
import { Setor } from "../../../models/Setor";
import { Medico } from "../../../models/Medico";
import "./medico.css";

function MedicoCadastrar() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [crm, setCrm] = useState("");
  const [telefone, setTelefone] = useState("");
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

  function formatarTelefone(valor: string): string {
    const digits = valor.replace(/\D/g, "").substring(0, 11); 
    const match = digits.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return valor;
  }

  function handleChangeTelefone(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    const telefoneFormatado = formatarTelefone(valor);
    setTelefone(telefoneFormatado);
  }

  function validarCRM(valor: string): boolean {
    const regex = /^\d{6}$/;
    return regex.test(valor);
  }

  function handleChangeCRM(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value.replace(/\D/g, "").substring(0, 6);
    setCrm(valor);
  }

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
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
      .post<Medico>("http://localhost:5098/hospital/cadastrar/medico", medico)
      .then((response) => {
        console.log("Médico cadastrado com sucesso", response.data);
        setMensagem("Médico cadastrado com sucesso!");
        setNome("");
        setGenero("");
        setEspecialidade("");
        setCrm("");
        setTelefone("");
        setDescricao("");
        setSetorId("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar médico", error);
        setMensagem("Erro ao cadastrar médico. Verifique os dados e tente novamente.");
      });
  }

  return (
    <div className="container">
      <h1>Cadastrar Médico</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={cadastrar}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
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
        </select>
        <label>Especialidade:</label>
        <input
          type="text"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          required
        />
        <label>CRM:</label>
        <input
          type="text"
          value={crm}
          onChange={handleChangeCRM}
          maxLength={6}
          required
        />
        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={handleChangeTelefone}
          maxLength={14}
          required
        />
        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
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

export default MedicoCadastrar;
