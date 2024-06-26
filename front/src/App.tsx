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
import MedicoListar from "./components/pages/medico/medico-listar"; 
import MedicoCadastrar from "./components/pages/medico/medico-cadastrar";
import MedicoAlterar from "./components/pages/medico/medico-alterar";
import MedicamentoListar from "./components/pages/medicamento/medicamento-listar";
import MedicamentoCadastrar from "./components/pages/medicamento/medicamento-cadastrar";
import MedicamentoAlterar from "./components/pages/medicamento/medicamento-alterar";

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
              <Link to="/consulta/listar">Listar consultas</Link>
            </li>
            <li>
              <Link to="/consulta/agendar">Agendar consulta</Link>
            </li>
            <li>
              <Link to="/setor/listar">Listar Setores</Link>
            </li>
            <li>
              <Link to="/setor/cadastrar">Cadastrar Setor</Link>
            </li>
            <li>
              <Link to="/medico/listar">Listar Médicos</Link>
            </li>
            <li>
              <Link to="/medico/cadastrar">Cadastrar Médico</Link>
            </li>
            <li>
              <Link to="/medicamento/listar">Listar medicamentos</Link>
            </li>
            <li>
              <Link to="/medicamento/cadastrar">Cadastrar Medicamento</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<PacienteListar />} />
          <Route path="/paciente/listar" element={<PacienteListar />} />
          <Route path="/paciente/cadastrar" element={<PacienteCadastrar />} />
          <Route path="/paciente/alterar/:id" element={<PacienteAlterar />} />
          <Route path="/consulta/agendar" element={<ConsultaCadastrar />} />
          <Route path="/consulta/listar" element={<ConsultaListar />} />
          <Route path="/consulta/alterar/:id" element={<ConsultaAlterar />} />
          <Route path="/setor/listar" element={<SetorListar />} />
          <Route path="/setor/cadastrar" element={<SetorCadastrar />} />
          <Route path="/setor/alterar/:id" element={<SetorAlterar />} />
          <Route path="/medico/listar" element={<MedicoListar />} />
          <Route path="/medico/cadastrar" element={<MedicoCadastrar />} />
          <Route path="/medico/alterar/:id" element={<MedicoAlterar />} />
          <Route path="/medicamento/listar" element={<MedicamentoListar />} />
          <Route path="/medicamento/cadastrar" element={<MedicamentoCadastrar />} />
          <Route path="/medicamento/alterar/:id" element={<MedicamentoAlterar/>} />
        </Routes>
        <footer>
          <p>Sistema de Gestão Hospitalar</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
