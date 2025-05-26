import { api } from "@/apis/api";
import { GenericTable } from "@components/common/GenericTable";
import type { ArticuloInsumoResponse } from "@dtos/ArticuloInsumo/ArticuloInsumoDtos";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export const Insumos = () => {
  // Estado de los insumos
  const [insumos, setInsumos] = useState<ArticuloInsumoResponse[]>([]);

  // Traer los insumos del backend
  const fetchInsumos = async () => {
    try {
      const { data } = await api.get<ArticuloInsumoResponse[]>(
        "articulo_insumo"
      );
      setInsumos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Solo se renderiza cuando se monta el componente
  useEffect(() => {
    fetchInsumos();
  }, []);

  // Creacion de las columnas de MRT
  const columns: MRT_ColumnDef<ArticuloInsumoResponse>[] = [
    {
      accessorKey: "denominacion",
      header: "Nombre",
    },
    {
      accessorKey: "articuloInsumoRubro.denominacion",
      header: "Rubro",
    },
    {
      accessorFn: (row) => `$${row.precioCompra}`,
      header: "Costo",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "unidadMedida.denominacion",
      header: "Unidad de medida",
    },
  ];

  return (
    <Container fluid="md">
      <GenericTable
        data={insumos}
        columns={columns}
        title="Insumos"
      />
    </Container>
  );
};
