import { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import type { ArticuloManufacturadoResponse } from "@dtos";
import { useCart } from "@/hooks/useCart";
import { handleImgError } from "@/utils/imageUtils";

type Props = {
  show: boolean;
  onHide: () => void;
  plato: ArticuloManufacturadoResponse | null;
};

const BASE_IMG_URL = "http://localhost:8080/imagenes/";

export const ModalPlato = ({ show, onHide, plato }: Props) => {
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(1);

  if (!plato) return null;

  const imgUrl = plato.imagen
    ? BASE_IMG_URL + plato.imagen
    : "/default-plato.png";

  const disponible = plato.stock === undefined || plato.stock === null || plato.stock > 0;

  const maxStock = plato.stock || 99;

  const handleAddToCart = () => {
    if (!disponible) return;

    addItem({
      id: plato.id,
      nombre: plato.denominacion,
      precio: plato.precioVenta,
      imagen: imgUrl,
      cantidad: cantidad,
      tipo: "manufacturado",
    });

    onHide();
    setCantidad(1);
  };

  const handleDecrease = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleIncrease = () => {
    if (cantidad < maxStock) {
      setCantidad(cantidad + 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body>
        <Row className="align-items-center">
          {/* Imagen */}
          <Col md={6} className="text-center mb-3 mb-md-0">
            <img
              src={imgUrl}
              alt={plato.denominacion}
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover" }}
              onError={handleImgError}
            />
          </Col>

          {/* Info */}
          <Col md={6}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">{plato.denominacion}</h3>
              <div
                className="fw-bold px-3 py-1 rounded"
                style={{ backgroundColor: "#FFD700", color: "#000", fontSize: "1.2rem" }}
              >
                ${plato.precioVenta.toFixed(2)}
              </div>
            </div>
            <p className="text-muted">{plato.descripcion}</p>

            {/* Selector de cantidad */}
            {disponible && (
              <div className="mt-4">
                <h6>Cantidad:</h6>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleDecrease}
                    disabled={cantidad <= 1}
                  >
                    -
                  </Button>
                  <div className="fw-bold" style={{ minWidth: "30px", textAlign: "center" }}>
                    {cantidad}
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleIncrease}
                    disabled={cantidad >= maxStock}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-success" onClick={onHide}>
          Continuar comprando
        </Button>
        {disponible ? (
          <Button variant="success" onClick={handleAddToCart}>
            🛒 Agregar al pedido
          </Button>
        ) : (
          <Button variant="danger" disabled>
            No disponible
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
