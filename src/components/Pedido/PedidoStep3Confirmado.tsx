import { Button, Table } from "react-bootstrap";
import { CartItem } from "@/types/cart.types";

type Props = {
  pedidoNumero?: number;
  formaEntrega: "local" | "domicilio";
  formaPago: "efectivo" | "mercadopago";
  items?: CartItem[];
};

export const PedidoStep3Confirmado = ({ pedidoNumero, formaEntrega, formaPago, items = [] }: Props) => {
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="text-center">
      <h4 className="mb-3 text-success">¡Pedido #{pedidoNumero} Confirmado con Éxito! 🎉</h4>
      <p>Gracias por tu compra.</p>

      <h5>Forma de entrega: {formaEntrega === "local" ? "Retiro en local" : "Entrega a domicilio"}</h5>
      <h5>Forma de pago: {formaPago === "efectivo" ? "Efectivo" : "MercadoPago"}</h5>

      <h5 className="mt-4 mb-3">Resumen del pedido:</h5>
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
        <Button variant="secondary">Ver Factura</Button>
      </div>
    </div>
  );
};
