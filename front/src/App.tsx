import React from "react";
import PacienteListar from "./components/pages/paciente/paciente-listar";
import PacienteCadastrar from "./components/pages/paciente/paciente-cadastrar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PacienteAlterar from "./components/pages/paciente/paciente-alterar";
import ConsultaCadastrar from "./components/pages/consulta/consulta-cadastrar";
import ConsultaListar from "./components/pages/consulta/consulta-listar";
import ConsultaAlterar from "./components/pages/consulta/consulta-alterar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/paciente/listar">Listar pacientes</Link>
            </li>
            <li>
              <Link to="/paciente/cadastrar">Cadastrar pacientes</Link>
            </li>
            <li>
              <Link to ="/consulta/listar">Listar consultas</Link>
            </li>
            <li>
              <Link to ="/consulta/agendar">Agendar consulta</Link>
            </li>

          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<PacienteListar/>} />
          <Route path="/paciente/listar" element={<PacienteListar />} />
          <Route
            path="/paciente/cadastrar"
            element={<PacienteCadastrar />}
          />
          <Route
            path="/paciente/alterar/:id"
            element={<PacienteAlterar />}
          />
          <Route
            path="/consulta/agendar"
            element={<ConsultaCadastrar />}
            />
          <Route
          path="/consulta/listar"
          element={<ConsultaListar />}
          />
          <Route
            path="/consulta/alterar/:id"
            element={<ConsultaAlterar />}
            />
    
        </Routes>
        <footer>
          <p>Sistema de Gestão Hospitalar</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;