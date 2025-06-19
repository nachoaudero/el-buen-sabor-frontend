import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";
import type { ArticuloManufacturadoResponse } from "@dtos/ArticuloManufacturado";
import { CartaPlato } from "@/components/common/Cards/CartaPlato";
import { ModalItem } from "@components/common/Modals/ModalItem.tsx";

const Menu = () => {
  const [productos, setProductos] = useState<ArticuloManufacturadoResponse[]>([]);
  const [filtroActivo, setFiltroActivo] = useState<ArticuloManufacturadoResponse | null>(null);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<ArticuloManufacturadoResponse | null>(null);
  const location = useLocation();

  // Cargar productos al montar la página
  useEffect(() => {
    fetch("http://localhost:8080/articulo_manufacturado")
      .then((res) => res.json())
      .then(setProductos)
      .catch(() => alert("Error al cargar productos"));
  }, []);

  // Si venimos desde el navbar con un producto filtrado
  useEffect(() => {
    if (location.state?.productoFiltrado) {
      setFiltroActivo(location.state.productoFiltrado);
    }
  }, [location.state]);

  const productosAMostrar = filtroActivo ? [filtroActivo] : productos;

  return (
    <Container className="my-5">
      <h2 className="mb-4">🍽️ Nuestro Menú</h2>

      {filtroActivo && (
        <div className="mb-3">
          <p>
            Mostrando resultados para: <strong>{filtroActivo.denominacion}</strong>
          </p>
          <Button variant="outline-secondary" onClick={() => setFiltroActivo(null)}>
            Ver todo el menú
          </Button>
        </div>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productosAMostrar.map((plato) => (
          <Col key={plato.id}>
            <CartaPlato plato={plato} onClick={() => setPlatoSeleccionado(plato)} />
          </Col>
        ))}
      </Row>

      {/* Modal detalle plato */}
      <ModalItem
        show={platoSeleccionado !== null}
        onHide={() => setPlatoSeleccionado(null)}
        item={platoSeleccionado}
      />
    </Container>
  );
};

export default Menu;
