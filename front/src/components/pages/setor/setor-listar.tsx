import React, { useEffect, useState } from "react";
import { Setor } from "../../../models/Setor";
import axios from "axios";
import { Link } from "react-router-dom";
import "./setor.css";

function SetorListar() {
  const [setores, setSetores] = useState<Setor[]>([]);

  useEffect(() => {
    carregarSetores();
  }, []);

  function carregarSetores() {
    axios
      .get<Setor[]>("http://localhost:5098/hospital/listar/setor")
      .then((response) => {
        setSetores(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar setores:", error);
      });
  }

  function deletarSetor(id: string) {
    axios
      .delete(`http://localhost:5098/hospital/deletar/setor/${id}`)
      .then(() => {
        carregarSetores();
      })
      .catch((error) => {
        console.error("Erro ao deletar setor:", error);
      });
  }

  return (
    <div className="container">
      <h1>Listar Setores</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {setores.map((setor) => (
            <tr key={setor.id}>
              <td>{setor.id}</td>
              <td>{setor.nome}</td>
              <td>
                <div className="botao-grupo">
                  <Link
                    to={`/setor/alterar/${setor.id}`}
                    className="botao botao-sucesso"
                  >
                    Alterar
                  </Link>
                  <button
                    type="button"
                    className="botao botao-danger"
                    onClick={() => deletarSetor(setor.id!)}
                  >
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SetorListar;
