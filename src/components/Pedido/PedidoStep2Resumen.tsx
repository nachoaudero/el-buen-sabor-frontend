import { Table, Button } from "react-bootstrap";
import type {CartItem} from "@/types/cart.types";

type Props = {
  formaEntrega: "local" | "domicilio";
  formaPago: "efectivo" | "mercadopago";
  items?: CartItem[];
  onConfirmFinal: () => void;
};

export const PedidoStep2Resumen = ({ formaEntrega, formaPago, items = [], onConfirmFinal }: Props) => {
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div>
      <h5 className="mb-3">Forma de entrega: {formaEntrega === "local" ? "Retiro en local" : "Entrega a domicilio"}</h5>
      <h5 className="mb-4">Forma de pago: {formaPago === "efectivo" ? "Efectivo" : "MercadoPago"}</h5>

      {items.length === 0 ? (
        <p>No hay productos en el pedido.</p>
      ) : (
        <>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precio.toFixed(2)}</td>
                  <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 className="text-end mt-3">
            Total: <span className="text-success">${total.toFixed(2)}</span>
          </h5>

          <div className="text-center mt-4">
            <Button variant="success" size="lg" onClick={onConfirmFinal}>
              {formaPago === "mercadopago" ? "Pagar con MercadoPago" : "Confirmar Pedido"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
