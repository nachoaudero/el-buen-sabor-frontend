import { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useCart } from "@/hooks/useCart";
import { handleImgError } from "@/utils/imageUtils";
import type {ArticuloManufacturadoResponse} from "@dtos/ArticuloManufacturado";
import type {ArticuloInsumoResponse} from "@dtos/ArticuloInsumo";
import type {PromocionResponse} from "@dtos/Promocion";
import type {CartItem} from "@/types/cart.types.ts";

type Props = {
  show: boolean;
  onHide: () => void;
  item: ArticuloManufacturadoResponse | ArticuloInsumoResponse | PromocionResponse | null;
};

const BASE_IMG_URL = "http://localhost:8080/imagenes/";

export const ModalItem = ({ show, onHide, item }: Props) => {
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(1);

  if (!item) return null;

  const imgUrl = item.imagen
    ? BASE_IMG_URL + item.imagen
    : "/default-plato.png";

  const disponible = true /*= plato.stock === undefined || plato.stock === null || plato.stock > 0;
 //todo hacer una funcion para determinar si el producto tiene stock disponible y cuanto tiene
  const maxStock = plato.stock || 99;*/

  const maxStock = 99;



  const handleAddToCart = () => {
    if (!disponible) return;

    let tipo: CartItem['tipo'];

    if ('tiempoEstimado' in item) {
      tipo = 'manufacturado';
    } else if ('esParaElaborar' in item) {
      tipo = 'insumo';
    } else if ('fechaDesde' in item) {
      tipo = 'promocion';
    } else {
      throw new Error('Tipo de item desconocido');
    }

    addItem({
      id: item.id,
      nombre: item.denominacion,
      precio: item.precioVenta,
      imagen: imgUrl,
      cantidad: cantidad,
      tipo: tipo,
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
              alt={item.denominacion}
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover" }}
              onError={handleImgError}
            />
          </Col>

          {/* Info */}
          <Col md={6}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">{item.denominacion}</h3>
              <div
                className="fw-bold px-3 py-1 rounded"
                style={{ backgroundColor: "#FFD700", color: "#000", fontSize: "1.2rem" }}
              >
                ${item.precioVenta.toFixed(2)}
              </div>
            </div>
            <p className="text-muted">{item.descripcion}</p>

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
