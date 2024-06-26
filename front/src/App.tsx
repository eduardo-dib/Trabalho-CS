import React from "react";
import PacienteListar from "./components/pages/paciente/paciente-listar";
import PacienteCadastrar from "./components/pages/paciente/paciente-cadastrar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PacienteAlterar from "./components/pages/paciente/paciente-alterar";
import ConsultaCadastrar from "./components/pages/consulta/consulta-cadastrar";
import ConsultaListar from "./components/pages/consulta/consulta-listar";
import ConsultaAlterar from "./components/pages/consulta/consulta-alterar";
import SetorListar from "./components/pages/setor/setor-listar";
import SetorCadastrar from "./components/pages/setor/setor-cadastrar";
import SetorAlterar from "./components/pages/setor/setor-alterar";
import MedicoAlterar from "./components/pages/medico/medico-alterar";
import MedicoCadastrar from "./components/pages/medico/medico-cadastrar";
import MedicoListar from "./components/pages/medico/medico-listar";

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
            <li>
              <Link to ="/setor/listar">Listar Setores</Link>
            </li>
            <li>
              <Link to ="/setor/cadastrar">Cadastrar Setores</Link>
            </li>
            <li>
              <Link to ="/listar/medico">Listar Médicos</Link>
            </li>
            <li>
              <Link to ="/cadastrar/medico">Cadastrar Médicos</Link>
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
          <Route
            path="/setor/listar"
            element={<SetorListar />}
            />
          <Route
            path="/setor/cadastrar"
            element={<SetorCadastrar />}
            />
          <Route
            path="/setor/alterar/:id"
            element={<SetorAlterar />}
            />
          <Route
            path="/cadastrar/medico"
            element={<MedicoCadastrar />}
            />
          <Route
            path="/atualizar/medico/:id"
            element={<MedicoAlterar />}
            />
          <Route
            path="/listar/medico"
            element={<MedicoListar />}
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