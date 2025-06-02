// src/components/common/BarraBusqueda.tsx
import { useEffect, useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import type { ArticuloManufacturadoResponse } from "@dtos";

type Props = {
  productos: ArticuloManufacturadoResponse[];
  onSelect: (producto: ArticuloManufacturadoResponse) => void;
  placeholder?: string;
};

export const BarraBusqueda = ({ productos, onSelect, placeholder }: Props) => {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<ArticuloManufacturadoResponse[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResultados([]);
    } else {
      const filtrados = productos
        .filter((p) =>
          p.denominacion.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);

      setResultados(filtrados);
    }
  }, [query, productos]);

  return (
    <div className="position-relative">
      <Form>
        <FormControl
          type="text"
          placeholder={placeholder || "Buscar productos..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
      {resultados.length > 0 && (
        <ListGroup
          className="position-absolute w-100 mt-1 z-3"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {resultados.map((p) => (
            <ListGroup.Item
              key={p.id}
              action
              onClick={() => {
                setQuery("");
                onSelect(p);
              }}
            >
              {p.denominacion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
