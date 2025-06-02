// src/components/common/Cards/CartaPlato.tsx
import { Card, Badge } from "react-bootstrap";
import type { ArticuloManufacturadoResponse } from "@dtos";

type Props = {
  plato: ArticuloManufacturadoResponse;
  onClick: (plato: ArticuloManufacturadoResponse) => void;
};

const BASE_IMG_URL = "http://localhost:8080/imagenes/";

export const CartaPlato = ({ plato, onClick }: Props) => {
  const imgUrl = plato.imagen
    ? BASE_IMG_URL + plato.imagen
    : "/default-plato.png"; // imagen fallback

  return (
    <Card
      className="shadow-sm h-100 cursor-pointer"
      style={{ width: "240px", height: "320px" }}
      onClick={() => onClick(plato)}
    >
      <Card.Img
        variant="top"
        src={imgUrl}
        alt={plato.denominacion}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-6 text-truncate mb-1">
            {plato.denominacion}
          </Card.Title>
          <Badge bg="secondary" className="mb-2">
            {plato.articuloManufacturadoRubro?.denominacion}
          </Badge>
        </div>
        <div>
          <Card.Text className="fw-bold mb-0">
            ${plato.precioVenta.toFixed(2)}
          </Card.Text>
          <small className="text-muted">⏱️ {plato.tiempoEstimado} min</small>
        </div>
      </Card.Body>
    </Card>
  );
};
