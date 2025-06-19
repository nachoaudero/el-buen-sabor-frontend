import { Button } from "react-bootstrap";
import { handleImgError } from "@/utils/imageUtils";

type Props = {
  item: {
    id: number | null;
    nombre: string;
    precio: number;
    imagen?: string;
    cantidad: number;
    stock?: number;
  };
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
};

export const CartItemCard = ({ item, onQuantityChange, onRemove }: Props) => {
  const handleDecrease = () => {
    if (item.cantidad > 1) {
      onQuantityChange(item.cantidad - 1);
    }
  };

  const handleIncrease = () => {
    const maxStock = item.stock || 99;
    if (item.cantidad < maxStock) {
      onQuantityChange(item.cantidad + 1);
    }
  };

  const maxStock = item.stock || 99;

  return (
    <div className="d-flex align-items-center justify-content-between border rounded p-3 mb-3 flex-wrap">
      {/* Imagen + nombre + precio */}
      <div className="d-flex align-items-center gap-3" style={{ flex: "1 1 300px" }}>
        <img
          src={item.imagen ?? "/default-plato.png"}
          alt={item.nombre}
          width="80"
          height="80"
          style={{ objectFit: "cover", borderRadius: "8px" }}
          onError={handleImgError}
        />
        <div>
          <h5 className="mb-1">{item.nombre}</h5>
          <p className="mb-1 fw-bold">${item.precio.toFixed(2)}</p>
          {item.stock && <small className="text-muted">{item.stock} disponibles</small>}
        </div>
      </div>

      {/* Cantidad + subtotal + eliminar */}
      <div className="d-flex align-items-center gap-3 flex-wrap justify-content-end">
        {/* Botones + y - */}
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleDecrease}
            disabled={item.cantidad <= 1} // ✅ Deshabilita el botón "-" si la cantidad es 1
          >
            -
          </Button>
          <div className="fw-bold" style={{ minWidth: "30px", textAlign: "center" }}>
            {item.cantidad}
          </div>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleIncrease}
            disabled={item.cantidad >= maxStock} // ✅ Deshabilita el botón "+" si la cantidad llegó al stock máximo
          >
            +
          </Button>
        </div>

        {/* Subtotal */}
        <div className="fw-bold" style={{ width: "80px", textAlign: "right" }}>
          ${(item.precio * item.cantidad).toFixed(2)}
        </div>

        {/* Eliminar */}
        <Button variant="outline-danger" size="sm" onClick={onRemove}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};
