import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center my-5">
      <h1 className="mb-4">¡Bienvenido a El Buen Sabor!</h1>
      <p className="mb-4">Descubrí nuestros platos y ordená online.</p>

      <Button variant="primary" size="lg" onClick={() => navigate("/menu")}>
        Ordenar ahora
      </Button>

      <Button
        variant="outline-secondary"
        size="lg"
        className="ms-3"
        onClick={() => navigate("/menu")}
      >
        Ver más
      </Button>
    </div>
  );
};
