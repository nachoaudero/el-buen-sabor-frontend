import { useCart } from "@/hooks/useCart";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Carrito = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleConfirmarPedido = () => {
    alert("Pedido confirmado (lógica pendiente)");
  };

  const handleContinuarComprando = () => {
    navigate("/ebs/menu");
  };

  // Ejemplo de sugerencias (pueden venir de un fetch)
  const sugerencias = [
    { id: 101, nombre: "Coca Cola", precio: 1500, imagen: "/default-plato.png" },
    { id: 102, nombre: "Sprite", precio: 1500, imagen: "/default-plato.png" },
    { id: 103, nombre: "Agua", precio: 1000, imagen: "/default-plato.png" },
    { id: 104, nombre: "Cerveza", precio: 2000, imagen: "/default-plato.png" },
  ];

  return (
    <Container className="my-5">
      <h2 className="mb-4">Mi Pedido</h2>
      <Row>
        {/* Columna izquierda: lista de items */}
        <Col md={8}>
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </Col>

        {/* Columna derecha: resumen */}
        <Col md={4}>
          <div className="border rounded p-3">
            <h5 className="mb-3">{cartItems.length} artículos</h5>
            <h4 className="fw-bold mb-4">${getTotal().toFixed(2)}</h4>
            <Button variant="primary" className="w-100 mb-2" onClick={handleConfirmarPedido}>
              CONFIRMAR PEDIDO
            </Button>
            <Button variant="outline-primary" className="w-100" onClick={handleContinuarComprando}>
              CONTINUAR COMPRANDO
            </Button>
          </div>
        </Col>
      </Row>

      {/* Sugerencias */}
      <div className="my-5">
        <h4 className="mb-4">Acompañá tu pedido con nuestras bebidas!</h4>
        <Row>
          {sugerencias.map((prod) => (
            <Col key={prod.id} md={3} className="mb-4 text-center">
              <img
                src={prod.imagen}
                alt={prod.nombre}
                width="120"
                height="120"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <h6 className="mt-2">{prod.nombre}</h6>
              <p className="fw-bold">${prod.precio.toFixed(2)}</p>
              <Button variant="success" size="sm">
                Ver más
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Carrito;
