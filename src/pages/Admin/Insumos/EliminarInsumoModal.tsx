import type { ArticuloInsumoResponse } from "@dtos/ArticuloInsumo";
import { Button, Modal } from "react-bootstrap";

interface Props {
  eliminarModal: boolean;
  setEliminarModal: React.Dispatch<React.SetStateAction<boolean>>;
  insumoSeleccionado: ArticuloInsumoResponse | null;
  confirmarEliminacion: () => void;
}

export const EliminarInsumoModal = ({
  eliminarModal,
  setEliminarModal,
  insumoSeleccionado,
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
          ¿Estás seguro de que querés eliminar el insumo
          <strong> {insumoSeleccionado?.denominacion}</strong>? <br />
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
