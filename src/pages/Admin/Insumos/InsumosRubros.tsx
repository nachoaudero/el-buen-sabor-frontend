import { GenericTable } from "@components/common/GenericTable";
import { FullPageLoader } from "@components/common/Loaders";
import type { ArticuloInsumoRubroResponse } from "@dtos/ArticuloInsumo";
import { Refresh } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { InsumoRubroService } from "@services/ArticuloInsumo";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export const InsumosRubros = () => {
  // REACT ROUTER
  const navigate = useNavigate();

  // Estado de los rubros de insumos
  const [insumosRubros, setInsumosRubros] = useState<
    ArticuloInsumoRubroResponse[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Traer los rubros del backend
  const fetchInsumosRubros = async () => {
    try {
      setLoading(true);

      const data = await InsumoRubroService.getAll();

      setInsumosRubros(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Accion de botones
  const cargarInsumoRubro = async () => {
    fetchInsumosRubros();
  };

  const crearInsumoRubro = () => {
    navigate("crear");
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

  // Cuando los datos esten cargando muestra la pantalla de carga
  if (loading) return <FullPageLoader />;

  return (
    <Container fluid="md">
      <div className="py-4 d-flex align-items-center gap-5 flex-wrap">
        <Typography
          component="h2"
          variant="h5"
          fontWeight="bold"
        >
          Rubro productos
        </Typography>
        <div className="d-flex gap-3">
          <IconButton onClick={cargarInsumoRubro}>
            <Refresh />
          </IconButton>
          <Button
            variant="success"
            onClick={crearInsumoRubro}
          >
            Nuevo
          </Button>
        </div>
      </div>
      <GenericTable
        data={insumosRubros}
        columns={columns}
        title="Rubros de insumos"
      />
    </Container>
  );
};
