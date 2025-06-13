import { Button, Form } from "react-bootstrap";

type Props = {
  formaEntrega: "local" | "domicilio" | "";
  setFormaEntrega: (value: "local" | "domicilio" | "") => void;
  formaPago: "efectivo" | "mercadopago" | "";
  setFormaPago: (value: "efectivo" | "mercadopago" | "") => void;
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

    if (formaEntrega === "" || formaPago === "") {
      alert("Por favor seleccioná forma de entrega y forma de pago.");
      return;
    }

    if (formaEntrega === "domicilio" && (direccion.trim() === "" || telefono.trim() === "")) {
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
        checked={formaEntrega === "local"}
        onChange={() => setFormaEntrega("local")}
        className="mb-2"
      />
      <Form.Check
        type="radio"
        label="Domicilio"
        name="formaEntrega"
        value="domicilio"
        checked={formaEntrega === "domicilio"}
        onChange={() => setFormaEntrega("domicilio")}
        className="mb-4"
      />

      {formaEntrega === "domicilio" && (
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
        checked={formaPago === "efectivo"}
        onChange={() => setFormaPago("efectivo")}
        className="mb-2"
      />
      <Form.Check
        type="radio"
        label="MercadoPago"
        name="formaPago"
        value="mercadopago"
        checked={formaPago === "mercadopago"}
        onChange={() => setFormaPago("mercadopago")}
        className="mb-4"
      />

      <Button variant="primary" type="submit">
        Siguiente
      </Button>
    </Form>
  );
};
