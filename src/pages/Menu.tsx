
import { BarraBusqueda } from "@/components/common/BarraBusqueda";
import { CartaPlato } from "@/components/common/Cards/CartaPlato";
import { ModalPlato } from "@components/common/Modals/ModalPlato";
import type { ArticuloManufacturadoResponse } from "@dtos";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";

export const Menu = () => {
  const [productos, setProductos] = useState<ArticuloManufacturadoResponse[]>([]);
  const [filtrados, setFiltrados] = useState<ArticuloManufacturadoResponse[]>([]);
  const [selected, setSelected] = useState<ArticuloManufacturadoResponse | null>(null);

  const location = useLocation();
  const productoDesdeNavbar = location.state?.productoFiltrado as ArticuloManufacturadoResponse | undefined;

  useEffect(() => {
    fetch("http://localhost:8080/articulo_manufacturado")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        if (productoDesdeNavbar) {
          // Filtra por coincidencia exacta de ID o denominación
          const match = data.filter((p) =>
            p.denominacion.toLowerCase().includes(productoDesdeNavbar.denominacion.toLowerCase())
          );
          setFiltrados(match);
        } else {
          setFiltrados(data);
        }
      });
  }, []);

  const handleSelect = (producto: ArticuloManufacturadoResponse) => {
    setSelected(producto);
    setFiltrados([producto]);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Menú completo</h2>

      <div className="mb-4">
        <BarraBusqueda productos={productos} onSelect={handleSelect} />
      </div>

      <Row className="g-4 justify-content-center">
        {filtrados.map((p) => (
          <Col key={p.id} xs="auto">
            <CartaPlato plato={p} onClick={setSelected} />
          </Col>
        ))}
      </Row>

      <ModalPlato show={!!selected} onHide={() => setSelected(null)} plato={selected} />
    </Container>
  );
};
