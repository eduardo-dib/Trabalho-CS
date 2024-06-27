import { useEffect, useState } from "react";
import { Paciente } from "../../../models/Paciente";
import axios from "axios";
import { Link } from "react-router-dom";
import "./paciente.css";

function PacienteListar() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    carregarPacientes();
  }, []);

  function carregarPacientes() {
    fetch("http://localhost:5098/hospital/listar/paciente")
      .then((resposta) => resposta.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPacientes(data);
        } else {
          console.error("Este tipo de informação não é um array", data);
        }
      })
      .catch((erro) => {
        console.log("Erro ao carregar pacientes!", erro);
      });
  }

  function deletar(id: string): void {
    axios
      .delete(`http://localhost:5098/hospital/deletar/paciente/${id}`)
      .then(() => {
        carregarPacientes();
      })
      .catch((erro) => {
        console.log("Erro ao deletar paciente!", erro);
      });
  }

  return (
    <div className="container">
      <h1>Listar Pacientes</h1>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Gênero</th>
            <th>Telefone</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nome}</td>
              <td>{paciente.cpf}</td>
              <td>{paciente.genero}</td>
              <td>{paciente.telefone}</td>
              <td>{paciente.descricao}</td>
              <td className="d-flex justify-content-between">
                <button 
                  className="btn btn-danger"
                  onClick={() => paciente.id && deletar(paciente.id)}>
                  Deletar
                </button>
                <Link className="btn btn-success ml-2" to={`/paciente/alterar/${paciente.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacienteListar;
