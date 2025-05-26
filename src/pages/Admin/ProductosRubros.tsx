import { api } from "@/apis/api";
import { GenericTable } from "@components/common/GenericTable";
import type { ArticuloManufacturadoRubroResponse } from "@dtos/ArticuloManufacturado/ArticuloManufacturadoRubroDtos";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export const ProductosRubros = () => {
  // Estado de los rubros de productos
  const [productosRubros, setProductosRubros] = useState<
    ArticuloManufacturadoRubroResponse[]
  >([]);

  // Traer los rubros del backend
  const fetchProductosRubros = async () => {
    try {
      const { data } = await api.get<ArticuloManufacturadoRubroResponse[]>(
        "articulo_manufacturado_rubro"
      );
      setProductosRubros(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Solo se renderiza cuando se monta el componente
  useEffect(() => {
    fetchProductosRubros();
  }, []);

  // Creacion de las columnas de MRT
  const columns: MRT_ColumnDef<ArticuloManufacturadoRubroResponse>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "denominacion",
      header: "Nombre",
    },
  ];

  return (
    <Container fluid="md">
      <GenericTable
        data={productosRubros}
        columns={columns}
        title="Rubros de productos"
      />
    </Container>
  );
};
