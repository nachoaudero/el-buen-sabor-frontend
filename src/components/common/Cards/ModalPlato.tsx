// src/components/common/Modals/ModalPlato.tsx
import { Modal } from "react-bootstrap";
import type { ArticuloManufacturadoResponse } from "@dtos";

type Props = {
  show: boolean;
  onHide: () => void;
  plato: ArticuloManufacturadoResponse | null;
};

const BASE_IMG_URL = "http://localhost:8080/imagenes/";

export const ModalPlato = ({ show, onHide, plato }: Props) => {
  if (!plato) return null;

  const imgUrl = plato.imagen
    ? BASE_IMG_URL + plato.imagen
    : "/default-plato.png";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{plato.denominacion}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={imgUrl}
          alt={plato.denominacion}
          className="img-fluid mb-3 rounded"
        />
        <p className="text-muted">{plato.descripcion}</p>
        <h5 className="fw-bold">Precio: ${plato.precioVenta.toFixed(2)}</h5>
      </Modal.Body>
    </Modal>
  );
};
