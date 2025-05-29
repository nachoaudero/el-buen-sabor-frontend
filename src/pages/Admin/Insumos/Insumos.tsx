import { GenericTable } from "@components/common/GenericTable";
import { FullPageLoader } from "@components/common/Loaders";
import type { ArticuloInsumoResponse } from "@dtos/ArticuloInsumo";
import { Refresh } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { InsumoService } from "@services/ArticuloInsumo";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export const Insumos = () => {
  // REACT ROUTER
  const navigate = useNavigate();

  // Estado de los insumos
  const [insumos, setInsumos] = useState<ArticuloInsumoResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // Traer los insumos del backend
  const fetchInsumos = async () => {
    try {
      setLoading(true);

      const data = await InsumoService.getAll();

      setInsumos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Accion de botones
  const cargarProductos = async () => {
    fetchInsumos();
  };

  const crearProducto = () => {
    navigate("crear");
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
          Insumos
        </Typography>
        <div className="d-flex gap-3">
          <IconButton onClick={cargarProductos}>
            <Refresh />
          </IconButton>
          <Button
            variant="success"
            onClick={crearProducto}
          >
            Nuevo
          </Button>
        </div>
      </div>
      <GenericTable
        data={insumos}
        columns={columns}
        title="Insumos"
      />
    </Container>
  );
};
