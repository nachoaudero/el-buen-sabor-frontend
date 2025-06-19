import { Button, Form } from "react-bootstrap";
import type {FormaPagoEnum, TipoEnvioEnum} from "@dtos/Pedido/Enums.ts";

type Props = {
  formaEntrega: TipoEnvioEnum;
  setFormaEntrega: (value: TipoEnvioEnum) => void;
  formaPago: FormaPagoEnum;
  setFormaPago: (value: FormaPagoEnum) => void;
  direccion: string;
  setDireccion: (value: string) => void;
  telefono: string;
  setTelefono: (value: string) => void;
  onConfirm: () => void;
};

export const PedidoStep1EntregaPago = ({
  formaEntrega,
  setFormaEntrega,
  formaPago,
  setFormaPago,
  direccion,
  setDireccion,
  telefono,
  setTelefono,
  onConfirm,
}: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formaEntrega === "NO_TIPO_ENVIO" || formaPago === "NO_FORMA_PAGO") {
      alert("Por favor seleccioná forma de entrega y forma de pago.");
      return;
    }

    if (formaEntrega === "DELIVERY" && (direccion.trim() === "" || telefono.trim() === "")) {
      alert("Por favor completá la dirección y el teléfono.");
      return;
    }

    onConfirm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h5>Forma de entrega</h5>
      <Form.Check
        type="radio"
        label="Retiro en local"
        name="formaEntrega"
        value="local"
        checked={formaEntrega === "TAKEAWAY"}
        onChange={() => setFormaEntrega("TAKEAWAY")}
        className="mb-2"
      />
      <Form.Check
        type="radio"
        label="Domicilio"
        name="formaEntrega"
        value="domicilio"
        checked={formaEntrega === "DELIVERY"}
        onChange={() => setFormaEntrega("DELIVERY")}
        className="mb-4"
      />

      {formaEntrega === "DELIVERY" && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Dirección de entrega</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Calle 123, Piso 4, Depto B"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Teléfono de contacto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 11 1234-5678"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>
        </>
      )}

      <h5>Forma de pago</h5>
      <Form.Check
        type="radio"
        label="Efectivo"
        name="formaPago"
        value="efectivo"
        checked={formaPago === "EFECTIVO"}
        onChange={() => setFormaPago("EFECTIVO")}
        className="mb-2"
      />
      <Form.Check
        type="radio"
        label="MercadoPago"
        name="formaPago"
        value="mercadopago"
        checked={formaPago === "MERCADOPAGO"}
        onChange={() => setFormaPago("MERCADOPAGO")}
        className="mb-4"
      />

      <Button variant="primary" type="submit">
        Siguiente
      </Button>
    </Form>
  );
};
