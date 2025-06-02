// src/pages/Menu.tsx
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CartaPlato } from "@/components/common/Cards/CartaPlato";
import { ModalPlato } from "@/components/common/Modals/ModalPlato";
import { BarraBusqueda } from "@/components/common/BarraBusqueda";
import type { ArticuloManufacturadoResponse } from "@dtos";

export const Menu = () => {
  const [productos, setProductos] = useState<ArticuloManufacturadoResponse[]>([]);
  const [filtrados, setFiltrados] = useState<ArticuloManufacturadoResponse[]>([]);
  const [selected, setSelected] = useState<ArticuloManufacturadoResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/articulo_manufacturado")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setFiltrados(data);
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
