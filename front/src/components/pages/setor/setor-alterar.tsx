import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Setor {
  id?: string;
  nome: string;
}

function SetorAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get<Setor>(`http://localhost:5098/hospital/buscar/setor/${id}`)
        .then((resposta) => {
          setNome(resposta.data.nome);
        })
        .catch((error) => {
          console.error("Erro ao buscar setor:", error);
        });
    }
  }, [id]);

  function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const setor: Setor = {
      nome: nome,
    };

    axios
      .put<Setor>(`http://localhost:5098/hospital/atualizar/setor/${id}`, setor)
      .then((response) => {
        console.log("Setor alterado com sucesso:", response.data);
        setSucesso(true);
        setTimeout(() => {
          setSucesso(false);
        }, 3000); 
        navigate("/setor/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar setor:", error);
      });
  }

  return (
    <div>
      <h1>Alterar Setor</h1>
      {sucesso && <p>Setor alterado com sucesso!</p>}
      <form onSubmit={salvar}>
        <label>Nome do Setor:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />{" "}
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default SetorAlterar;