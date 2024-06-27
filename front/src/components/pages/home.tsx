import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home: React.FC = () => (
  <Container className="home-container">
    <Row>
      {["Consulta", "Medicamento", "Médico", "Paciente", "Setor"].map((item, index) => (
        <Col key={index} md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="card-title">{item}</Card.Title>
              <Card.Text>
                <Link to={`/${item.toLowerCase()}`} className="btn btn-primary">
                  Gerenciar {item}
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default Home;
