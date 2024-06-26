import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Medicamento } from "../../../models/Medicamento";

function MedicamentoListar() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  useEffect(() => {
    console.log("Executando ao carregar o componente...");
    carregarMedicamentos();
  }, []);

  function carregarMedicamentos() {
    axios
      .get("http://localhost:5098/hospital/listar/medicamento")
      .then((response) => {
        setMedicamentos(response.data);
        console.table(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar medicamentos", error);
      });
  }

  function deletarMedicamento(id: string): void {
    axios
      .delete(`http://localhost:5098/hospital/deletar/medicamento/${id}`)
      .then(() => {
        carregarMedicamentos();
      })
      .catch((error) => {
        console.error("Erro ao deletar medicamento", error);
      });
  }

  return (
    <div>
      <h1>Listar Medicamentos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade Disponível</th>
            <th>Descrição</th>
            <th>Setor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id}>
              <td>{medicamento.id}</td>
              <td>{medicamento.nome}</td>
              <td>{medicamento.quantidadeDisponivel}</td>
              <td>{medicamento.descricao}</td>
              <td>{medicamento.setorNome}</td>
              <td>
                <button
                  onClick={() =>
                    medicamento.id && deletarMedicamento(medicamento.id)
                  }
                >
                  Deletar
                </button>
                <Link to={`/medicamento/alterar/${medicamento.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicamentoListar;
