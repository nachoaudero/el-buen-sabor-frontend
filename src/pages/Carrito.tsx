import { useCart } from "@/hooks/useCart";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { pedidoService } from "@services/Pedido/pedido.services.ts";

const Carrito = () => {
  const { cartItems, updateQuantity, removeItem, getTotal } = useCart();
  const navigate = useNavigate();

  const handleConfirmarPedido = async () => {
    try {
      const pedidoCreado = await pedidoService.create(cartItems, getTotal());
      console.log("Pedido creado:", pedidoCreado);
      navigate(`/ebs/pedido/${pedidoCreado.id}`); // navegación OK
    } catch (error) {
      console.error("Error al confirmar pedido", error);
      alert("Error al confirmar pedido");
    }
  };

  const handleContinuarComprando = () => {
    navigate("/ebs/menu");
  };

  /*const sugerencias = [
    { id: 101, nombre: "Coca Cola", precio: 1500, imagen: "/default-plato.png" },
    { id: 102, nombre: "Sprite", precio: 1500, imagen: "/default-plato.png" },
    { id: 103, nombre: "Agua", precio: 1000, imagen: "/default-plato.png" },
    { id: 104, nombre: "Cerveza", precio: 2000, imagen: "/default-plato.png" },
  ];*/

  return (
    <Container className="my-5">
      <h2 className="mb-4">Mi Pedido</h2>
      <Row>
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
    </Container>
  );
};

export default Carrito;
