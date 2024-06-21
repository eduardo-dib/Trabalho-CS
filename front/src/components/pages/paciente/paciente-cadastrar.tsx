import React, { useState } from "react";
import { Paciente } from "../../../models/Paciente";

function PacienteCadastrar() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sucesso, setSucesso] = useState(false);

  function formatarCPF(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  function handleChangeCPF(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value.replace(/\D/g, ""); 
    const cpfFormatado = formatarCPF(valor);
    setCpf(cpfFormatado);
  }

  function formatarTelefone(telefone: string): string {
    const valor = telefone.replace(/\D/g, ""); 
    const match = valor.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return telefone;
  }

  function handleChangeTelefone(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    const telefoneFormatado = formatarTelefone(valor);
    setTelefone(telefoneFormatado);
  }

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const paciente: Paciente = {
      nome: nome,
      cpf: cpf.replace(/\D/g, ""), 
      genero: genero,
      telefone: telefone.replace(/\D/g, ""), 
      descricao: descricao,
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
        setSucesso(true);
        setTimeout(() => {
          setSucesso(false);
        }, 3000); 
      
        setNome("");
        setCpf("");
        setGenero("");
        setTelefone("");
        setDescricao("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar paciente:", error);
      });
  }

  return (
    <div>
      <h1>Cadastrar Paciente</h1>
      {sucesso && <p>Paciente cadastrado com sucesso!</p>}
      <form onSubmit={cadastrar}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
        />{" "}
        <br />
        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={handleChangeCPF}
          maxLength={14}
          placeholder="xxx.xxx.xxx-xx"
          required 
        />{" "}
        <br />
        <label>Gênero:</label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required 
        >
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Prefiro não informar">Prefiro não informar</option>
        </select>{" "}
        <br />
        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={handleChangeTelefone}
          maxLength={14}
          placeholder="(xx) xxxxx-xxxx"
          required 
        />{" "}
        <br />
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required 
        />{" "}
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default PacienteCadastrar;
