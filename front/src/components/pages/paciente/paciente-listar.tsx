import { useEffect, useState } from "react";
import { Paciente } from "../../../models/Paciente";
import axios from "axios";
import { Link } from "react-router-dom";



function PacienteListar() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    console.log("Executar algo ao carregar o componente...");
    carregarPacientes();
  }, []);

  function carregarPacientes() {
    // FETCH ou AXIOS
    fetch("http://localhost:5098/hospital/listar/paciente")
      .then((resposta) => resposta.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPacientes(data);
          console.table(data);
        } else {
          console.error("Este tipo de informação não é um array", data);
        }
      })
      .catch((erro) => {
        console.log("Deu erro!", erro);
      });
  }

  function deletar(id: string): void {
    console.log(`http://localhost:5098/${id}`);
    axios
      .delete(`http://localhost:5098/hospital/deletar/paciente/${id}`)
      .then(() => {
        carregarPacientes();
      })
      .catch((erro) => {
        console.log("Erro ao deletar!", erro);
      });
  }

  return (
    <div>
      <h1>Listar Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cpf</th>
            <th>Genero</th>
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
              <td>
                <button 
                  onClick={() => paciente.id && deletar(paciente.id)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/paciente/alterar/${paciente.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacienteListar;
