import { useEffect, useState } from "react";
import axios from "axios";
import { Consulta } from "../../../models/Consulta";
import { Link } from "react-router-dom";
import "./consulta.css";

function ConsultaListar() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    carregarConsultas();
  }, []);

  function carregarConsultas() {
    axios.get("http://localhost:5098/hospital/consulta/listar")
      .then((response) => {
        setConsultas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar consultas", error);
      });
  }

  function deletarConsulta(id: string): void {
    axios.delete(`http://localhost:5098/hospital/consulta/deletar/${id}`)
      .then(() => {
        carregarConsultas();
      })
      .catch((error) => {
        console.error("Erro ao deletar consulta", error);
      });
  }

  return (
    <div className="container">
      <h1>Listar Consultas</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data e Hora</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>{consulta.id}</td>
              <td>{consulta.dataHoraConsulta}</td>
              <td>{consulta.pacienteNome}</td>
              <td>{consulta.medicoNome}</td>
              <td>{consulta.observacoes}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => consulta.id && deletarConsulta(consulta.id)}
                >
                  Deletar
                </button>
                <Link
                  to={`/consulta/alterar/${consulta.id}`}
                  className="btn btn-success btn-sm"
                >
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaListar;
