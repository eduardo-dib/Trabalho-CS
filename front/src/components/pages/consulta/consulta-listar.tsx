import { useEffect, useState } from "react";
import axios from "axios";
import { Consulta } from "../../../models/Consulta";
import { Link } from "react-router-dom";

function ConsultaListar() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    console.log("Executando ao carregar o componente...");
    carregarConsultas();
  }, []);

  function carregarConsultas() {
    axios.get("http://localhost:5098/hospital/consulta/listar")
      .then((response) => {
        setConsultas(response.data);
        console.table(response.data);
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
    <div>
      <h1>Listar Consultas</h1>
      <table>
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
              <button onClick={() => consulta.id && deletarConsulta(consulta.id)}>
                  Deletar
                </button>
                <Link to={`/consulta/alterar/${consulta.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaListar;
