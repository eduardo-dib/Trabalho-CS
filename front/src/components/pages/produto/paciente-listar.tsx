import { useEffect, useState } from "react";
import { Paciente } from "/Users/Pichau/Documents/Dudu/Estudo/Programação/Faculdade/SYT/Trabalho A2/TRABALHO-CSBACKUP4/Trabalho-CS/front/src/models/Paciente";

//EXERCÍCIOS
//1 - Implementar o cadastro a partir do formulário
//2 - Implementar a remoção
//3 - Implementar a alteração

function PacienteListar() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  //Evento de carregamento do componente
  useEffect(() => {
    console.log("Executar algo ao carregar o componente...");
    carregarPacientes();
  }, []);

  function carregarPacientes() {
    //FETCH ou AXIOS
    fetch("http://localhost:5098/hospital/listar/paciente")
      .then((resposta) => resposta.json())
      .then((pacientes: Paciente[]) => {
        setPacientes(pacientes);
        console.table(pacientes);
      })
      .catch((erro) => {
        console.log("Deu erro!");
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
          </tr>
        </thead>
        <tbody>
          {pacientes.map((Paciente) => (
            <tr key={Paciente.id}>
              <td>{Paciente.id}</td>
              <td>{Paciente.nome}</td>
              <td>{Paciente.cpf}</td>
              <td>{Paciente.genero}</td>
              <td>{Paciente.telefone}</td>
              <td>{Paciente.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacienteListar;
