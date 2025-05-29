import type { ArticuloInsumoResponse } from "@dtos/ArticuloInsumo";
import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  insumoSeleccionadoId: number | null;
  setInsumoSeleccionadoId: React.Dispatch<React.SetStateAction<number | null>>;
  insumos: ArticuloInsumoResponse[];
  cantidad: number;
  setCantidad: React.Dispatch<React.SetStateAction<number>>;
  handleAgregarInsumo: () => void;
}

export const AgregarInsumoModal = ({
  showModal,
  handleCloseModal,
  insumoSeleccionadoId,
  setInsumoSeleccionadoId,
  insumos,
  cantidad,
  setCantidad,
  handleAgregarInsumo,
}: Props) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar insumo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* SELECT INSUMO */}
        <Form.Group className="mb-3">
          <Form.Label>Seleccione un insumo</Form.Label>
          <Form.Select
            value={insumoSeleccionadoId ?? ""}
            onChange={(e) => setInsumoSeleccionadoId(Number(e.target.value))}
          >
            <option value="">-- Seleccionar --</option>
            {insumos
              .filter((i) => i.esParaElaborar)
              .map((insumo) => (
                <option
                  key={insumo.id}
                  value={insumo.id}
                >
                  {insumo.denominacion}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        {/* DETALLES DEL INSUMO */}
        {insumoSeleccionadoId && (
          <>
            <hr />
            <p>
              <strong>Descripción:</strong>{" "}
              {insumos.find((i) => i.id === insumoSeleccionadoId)?.descripcion}
            </p>
            <p>
              <strong>Unidad de medida:</strong>{" "}
              {
                insumos.find((i) => i.id === insumoSeleccionadoId)?.unidadMedida
                  .denominacion
              }
            </p>
            <p>
              <strong>Precio de compra:</strong> ${" "}
              {insumos.find((i) => i.id === insumoSeleccionadoId)?.precioCompra}
            </p>

            {/* INGRESO DE CANTIDAD */}
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
            </Form.Group>

            {/* COSTO CALCULADO */}
            <p>
              <strong>Costo total:</strong> $
              {(
                cantidad *
                (insumos.find((i) => i.id === insumoSeleccionadoId)
                  ?.precioCompra || 0)
              ).toFixed(2)}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseModal}
        >
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleAgregarInsumo}
          disabled={!insumoSeleccionadoId || cantidad <= 0}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
