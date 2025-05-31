import type { ArticuloManufacturadoResponse } from "@dtos/ArticuloManufacturado";
import { Button, Modal } from "react-bootstrap";

interface Props {
  eliminarModal: boolean;
  setEliminarModal: React.Dispatch<React.SetStateAction<boolean>>;
  productoSeleccionado: ArticuloManufacturadoResponse | null;
  confirmarEliminacion: () => void;
}

export const EliminarProductoModal = ({
  eliminarModal,
  setEliminarModal,
  productoSeleccionado,
  confirmarEliminacion,
}: Props) => {
  return (
    <Modal
      show={eliminarModal}
      onHide={() => setEliminarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que querés eliminar el producto
          <strong> {productoSeleccionado?.denominacion}</strong>? <br />
          Esta acción es <strong>irreversible</strong>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setEliminarModal(false)}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={confirmarEliminacion}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
