import React, { useEffect, useState } from "react";
import { Paciente } from "../../../models/Paciente";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./paciente.css";

function PacienteAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get<Paciente>(`http://localhost:5098/hospital/buscar/paciente/${id}`)
        .then((resposta) => {
          setNome(resposta.data.nome);
          setCpf(formatarCPF(resposta.data.cpf));
          setGenero(resposta.data.genero);
          setTelefone(resposta.data.telefone);
          setDescricao(resposta.data.descricao);
        })
        .catch((error) => {
          console.error("Erro ao buscar paciente:", error);
        });
    }
  }, [id]);

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

  function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const paciente: Paciente = {
      nome: nome,
      cpf: cpf.replace(/\D/g, ""),
      genero: genero,
      telefone: telefone.replace(/\D/g, ""),
      descricao: descricao,
    };

    axios
      .put<Paciente>(`http://localhost:5098/hospital/alterar/paciente/${id}`, paciente)
      .then((response) => {
        console.log("Paciente alterado com sucesso:", response.data);
        setSucesso(true);
        setTimeout(() => {
          setSucesso(false);
        }, 3000);
        navigate("/paciente/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar paciente:", error);
      });
  }

  return (
    <div className="container form-container">
      <h1>Alterar Paciente</h1>
      {sucesso && <p className="alert alert-success">Paciente alterado com sucesso!</p>}
      <form onSubmit={salvar}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            className="form-control"
            value={cpf}
            onChange={handleChangeCPF}
            maxLength={14}
            placeholder="xxx.xxx.xxx-xx"
            required
          />
        </div>
        <div className="form-group">
          <label>Gênero:</label>
          <select
            className="form-control"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            className="form-control"
            value={telefone}
            onChange={handleChangeTelefone}
            maxLength={14}
            placeholder="(xx) xxxxx-xxxx"
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default PacienteAlterar;
