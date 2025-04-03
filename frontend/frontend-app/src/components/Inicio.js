import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap"; // Importamos componentes de Bootstrap

const Inicio = () => {
  return (
    <div className="inicio-container d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="text-center">
          <Col>
            <h1 className="display-4 text-primary mb-4">
              Bienvenido a la aplicación
            </h1>
            <p className="lead mb-4">
              ¡Estamos encantados de tenerte con nosotros! Explora las funciones
              y empieza a disfrutar de lo que ofrecemos.
            </p>
            <Button variant="primary" size="lg" href="/perfil">
              Ir a mi perfil
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Inicio;
