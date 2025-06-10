// src/components/common/CarritoContenido.tsx
import { useCart } from "@/hooks/useCart";
import { Button, Form } from "react-bootstrap";
import { handleImgError } from "@/utils/imageUtils"; // ✅ import del helper

export const CarritoContenido = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, getTotal } = useCart();

  if (cartItems.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="d-flex align-items-center justify-content-between border-bottom py-2"
        >
          <div className="d-flex align-items-center gap-3">
            <img
              src={item.imagen ?? "/default-plato.png"} // fallback simple
              alt={item.nombre}
              width="60"
              height="60"
              style={{ objectFit: "cover", borderRadius: "8px" }}
              onError={handleImgError} // ✅ usar el helper
            />
            <div>
              <h5 className="mb-1">{item.nombre}</h5>
              <p className="mb-0">Precio: ${item.precio}</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Form.Control
              type="number"
              min={1}
              value={item.cantidad}
              onChange={(e) =>
                updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
              }
              style={{ width: "80px" }}
            />
            <Button variant="danger" onClick={() => removeItem(item.id)}>
              Eliminar
            </Button>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <h5>Total: ${getTotal().toFixed(2)}</h5>
        <Button variant="outline-danger" onClick={clearCart} className="mt-2">
          Vaciar carrito
        </Button>
      </div>
    </>
  );
};
