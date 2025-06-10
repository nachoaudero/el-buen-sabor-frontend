import { Modal, Button } from "react-bootstrap";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router";
import { CarritoContenido } from "@/components/common/CarritoContenido";

type Props = {
  show: boolean;
  onHide: () => void;
};

export const ModalCarrito = ({ show, onHide }: Props) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleIrAlCarrito = () => {
    onHide();
    navigate("/ebs/carrito"); // ✅ corregido
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>🛒 Mi Carrito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CarritoContenido />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        {cartItems.length > 0 && (
          <Button variant="primary" onClick={handleIrAlCarrito}>
            Ir al carrito
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
