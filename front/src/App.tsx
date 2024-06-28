import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PacienteListar from "./components/pages/paciente/paciente-listar";
import PacienteCadastrar from "./components/pages/paciente/paciente-cadastrar";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center" as const,
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar-brand">Sistema de Gestão Hospitalar</div>
          <div className="navbar-toggle" id="navbarToggle" onClick={toggleMenu}>
            &#9776;
          </div>
          <ul className={`navbar-menu ${isMenuOpen ? "show" : ""}`} id="navbarMenu">
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <a href="#">Pacientes</a>
              <ul className="dropdown-menu">
                <li><Link to="/paciente/listar">Listar pacientes</Link></li>
                <li><Link to="/paciente/cadastrar">Cadastrar pacientes</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">Consultas</a>
              <ul className="dropdown-menu">
                <li><Link to="/consulta/listar">Listar consultas</Link></li>
                <li><Link to="/consulta/agendar">Agendar consulta</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">Setores</a>
              <ul className="dropdown-menu">
                <li><Link to="/setor/listar">Listar Setores</Link></li>
                <li><Link to="/setor/cadastrar">Cadastrar Setor</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">Médicos</a>
              <ul className="dropdown-menu">
                <li><Link to="/medico/listar">Listar Médicos</Link></li>
                <li><Link to="/medico/cadastrar">Cadastrar Médico</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">Medicamentos</a>
              <ul className="dropdown-menu">
                <li><Link to="/medicamento/listar">Listar medicamentos</Link></li>
                <li><Link to="/medicamento/cadastrar">Cadastrar Medicamento</Link></li>
              </ul>
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
          <Route path="/medicamento/alterar/:id" element={<MedicamentoAlterar />} />
        </Routes>
        <footer style={footerStyle}>
          <p>Sistema de Gestão Hospitalar - DAVI ALVES, EDUARDO CARDOZO, GUSTAVO GIROTTO</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
