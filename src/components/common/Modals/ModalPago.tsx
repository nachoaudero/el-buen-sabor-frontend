import { Modal, Button, Form } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
};

export const ModalPago = ({ show, onHide }: Props) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar método de pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="radio"
            id="efectivo"
            label="Efectivo"
            name="pago"
            defaultChecked
          />
          <Form.Check
            type="radio"
            id="debito"
            label="Tarjeta de Débito"
            name="pago"
          />
          <Form.Check
            type="radio"
            id="credito"
            label="Tarjeta de Crédito"
            name="pago"
          />
          <Form.Check
            type="radio"
            id="mercado-pago"
            label="Mercado Pago"
            name="pago"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => {
          alert("Pago procesado (provisional)");
          onHide();
        }}>
          Confirmar pago
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
