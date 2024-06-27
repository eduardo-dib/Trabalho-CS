import { useEffect, useState } from "react";
import axios from "axios";
import { Medico } from "../../../models/Medico";
import { Link } from "react-router-dom";
import "./medico.css";

function MedicoListar() {
  const [medicos, setMedicos] = useState<Medico[]>([]);

  useEffect(() => {
    console.log("Executando ao carregar o componente...");
    carregarMedicos();
  }, []);

  function carregarMedicos() {
    axios
      .get("http://localhost:5098/hospital/listar/medico")
      .then((response) => {
        setMedicos(response.data);
        console.table(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar médicos", error);
      });
  }

  function deletarMedico(id: string): void {
    axios
      .delete(`http://localhost:5098/hospital/deletar/medico/${id}`)
      .then(() => {
        carregarMedicos();
      })
      .catch((error) => {
        console.error("Erro ao deletar médico", error);
      });
  }

  return (
    <div className="table-container">
      <h1>Listar Médicos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Especialidade</th>
            <th>CRM</th>
            <th>Telefone</th>
            <th>Descrição</th>
            <th>Setor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.id}>
              <td>{medico.id}</td>
              <td>{medico.nome}</td>
              <td>{medico.genero}</td>
              <td>{medico.especialidade}</td>
              <td>{medico.crm}</td>
              <td>{medico.telefone}</td>
              <td>{medico.descricao}</td>
              <td>{medico.setorNome}</td>
              <td className="actions">
                <button className="delete" onClick={() => medico.id && deletarMedico(medico.id)}>
                  Deletar
                </button>
                <Link className="edit" to={`/medico/alterar/${medico.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicoListar;
