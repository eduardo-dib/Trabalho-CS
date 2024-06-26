import { useEffect, useState } from "react";
import { Setor } from "../../../models/Setor";
import { Medico } from "../../../models/Medico";
import axios from "axios";
import { Link } from "react-router-dom";



function SetorListar() {
  const [Setor, setSetor] = useState<Setor[]>([]);

  useEffect(() => {
    console.log("Executar algo ao carregar o componente...");
    carregarSetor();
  }, []);

  function carregarSetor() {
    // FETCH ou AXIOS
    fetch("http://localhost:5098/hospital/listar/setor")
      .then((resposta) => resposta.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSetor(data);
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
      .delete(`http://localhost:5098/hospital/deletar/setor/${id}`)
      .then(() => {
        carregarSetor();
      })
      .catch((erro) => {
        console.log("Erro ao deletar!", erro);
      });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Setor.map((setor) => (
            <tr key={setor.id}>
              <td>{setor.id}</td>
              <td>{setor.nome}</td>
              <td>
                <button onClick={() => setor.id && deletar(setor.id)}>Deletar</button>
                <Link to={`/setor/alterar/${setor.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default SetorListar;
