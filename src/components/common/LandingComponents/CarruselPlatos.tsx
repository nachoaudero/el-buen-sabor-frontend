// src/components/common/LandingComponents/CarruselPlatos.tsx
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CartaPlato } from "../Cards/CartaPlato";
import { ModalPlato } from "../Cards/ModalPlato";
import type { ArticuloManufacturadoResponse } from "@dtos";
import "./CarruselPlatos.css";

export const CarruselPlatos = () => {
  const [platos, setPlatos] = useState<ArticuloManufacturadoResponse[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<ArticuloManufacturadoResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/articulo_manufacturado")
      .then((res) => res.json())
      .then((data) => setPlatos(data))
      .catch(() => alert("Error al cargar platos"));
  }, []);

  const avanzar = () => {
    setIndex((prev) => (prev + 1) % platos.length);
  };

  const retroceder = () => {
    setIndex((prev) => (prev - 1 + platos.length) % platos.length);
  };

  const getVisibles = () => {
    const visibles: ArticuloManufacturadoResponse[] = [];

    if (platos.length === 0) return visibles;

    for (let i = -2; i <= 2; i++) {
      const idx = (index + i + platos.length) % platos.length;
      visibles.push(platos[idx]);
    }

    while (visibles.length < 5) {
      visibles.push(platos[visibles.length % platos.length]);
    }

    return visibles;
  };

  const visibles = getVisibles();

  return (
    <Container className="position-relative py-4 text-center overflow-hidden">
      <Button
        variant="light"
        className="position-absolute top-50 start-0 translate-middle-y z-2"
        onClick={retroceder}
      >
        <FaChevronLeft size={24} />
      </Button>

      <div className="d-flex justify-content-center align-items-center gap-3 px-5 carrusel-track">
        {visibles.map((plato, i) => {
          let className = "carrusel-card";
          if (i === 0 || i === 4) className += " carrusel-edge";

          return (
            <div key={`${plato.id}-${i}`} className={className}>
              <CartaPlato plato={plato} onClick={setSelected} />
            </div>
          );
        })}
      </div>

      <Button
        variant="light"
        className="position-absolute top-50 end-0 translate-middle-y z-2"
        onClick={avanzar}
      >
        <FaChevronRight size={24} />
      </Button>

      <ModalPlato show={!!selected} onHide={() => setSelected(null)} plato={selected} />
    </Container>
  );
};
