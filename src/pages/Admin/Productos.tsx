import { api } from "@/apis/api";
import { GenericTable } from "@components/common/GenericTable";
import type { ArticuloManufacturadoResponse } from "@dtos/ArticuloManufacturado/ArticuloManufacturadoDtos";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export const Productos = () => {
  // Estado de los productos
  const [productos, setProductos] = useState<ArticuloManufacturadoResponse[]>(
    []
  );

  // Traer los productos del backend
  const fetchProductos = async () => {
    try {
      const { data } = await api.get<ArticuloManufacturadoResponse[]>(
        "articulo_manufacturado"
      );
      setProductos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Solo se renderiza cuando se monta el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  // Creacion de las columnas de MRT
  const columns: MRT_ColumnDef<ArticuloManufacturadoResponse>[] = [
    {
      accessorKey: "denominacion",
      header: "Denominación",
    },
    {
      accessorKey: "articuloManufacturadoRubro.denominacion",
      header: "Rubro",
    },
    {
      accessorKey: "tiempoEstimado",
      header: "Tiempo de preparacion (min)",
    },
    {
      accessorFn: (row) => `$${row.precioVenta}`,
      header: "Precio de Venta",
    },
  ];

  return (
    <Container fluid="md">
      <GenericTable
        data={productos}
        columns={columns}
        title="Productos"
      />
    </Container>
  );
};
