// src/pages/Home.tsx
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import pizzaImg from "@/assets/images/pizza1.jpg";
import { CarruselPlatos } from "@components/common/LandingComponents/CarruselPlatos";
import { MapaLocal } from "@/components/common/LandingComponents/MapaLocal";

export const Home = () => {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          backgroundImage: `url(${pizzaImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          color: "white",
        }}
        className="d-flex align-items-center"
      >
        <Container>
          <h1 className="display-3 fw-bold">LA BUONA PIZZA</h1>
          <p className="lead col-md-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
          <Button variant="light" size="lg">
            ORDENAR AHORA
          </Button>
        </Container>
      </div>


<Container className="text-center my-5">
  <h2 className="mb-4">Populares</h2>
  <CarruselPlatos />
  <Button variant="outline-primary" className="mt-4">
    Ver Más
  </Button>
</Container>


<Container className="text-center my-5">
  <h2 className="mb-4">Nuestra Ubicación</h2>
  <MapaLocal />
</Container>

      {/* Footer */}
      <footer className="bg-dark text-white pt-4 pb-2">
        <Container>
          <Row>
            <Col md={6}>
              <p>📞 +52 554 123123</p>
              <p>📍 Av de los Alpes 666, México</p>
            </Col>
            <Col md={6} className="text-md-end">
              <p>📸 @pizzas_enlima</p>
              <p>🐦 @pizzas_www</p>
            </Col>
          </Row>
          <p className="text-center mt-3 mb-0">
            Desarrollado por La Codienda — 2025
          </p>
        </Container>
      </footer>
    </>
  );
};
