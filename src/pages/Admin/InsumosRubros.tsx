import { api } from "@/apis/api";
import { GenericTable } from "@components/common/GenericTable";
import type { ArticuloInsumoRubroResponse } from "@dtos/ArticuloInsumo/ArticuloInsumoRubroDtos";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export const InsumosRubros = () => {
  // Estado de los rubros de insumos
  const [insumosRubros, setInsumosRubros] = useState<
    ArticuloInsumoRubroResponse[]
  >([]);

  // Traer los rubros del backend
  const fetchInsumosRubros = async () => {
    try {
      const { data } = await api.get<ArticuloInsumoRubroResponse[]>(
        "articulo_insumo_rubro"
      );
      setInsumosRubros(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Solo se renderiza cuando se monta el componente
  useEffect(() => {
    fetchInsumosRubros();
  }, []);

  // Creacion de las columnas de MRT
  const columns: MRT_ColumnDef<ArticuloInsumoRubroResponse>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "denominacion",
      header: "Nombre",
    },
    {
      accessorFn: (row) =>
        row.rubroPadre ? row.rubroPadre.denominacion : "Rubro padre",
      header: "Rubro padre",
    },
  ];

  return (
    <Container fluid="md">
      <GenericTable
        data={insumosRubros}
        columns={columns}
        title="Rubros de insumos"
      />
    </Container>
  );
};
