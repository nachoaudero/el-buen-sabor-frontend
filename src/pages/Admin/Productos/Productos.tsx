import { GenericTable } from "@components/common/GenericTable";
import { FullPageLoader } from "@components/common/Loaders";
import type { ArticuloManufacturadoResponse } from "@dtos/ArticuloManufacturado";
import { Refresh } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { ManufacturadoService } from "@services/ArticuloManufacturado";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export const Productos = () => {
  // REACT ROUTER
  const navigate = useNavigate();

  // Estado de los productos
  const [productos, setProductos] = useState<ArticuloManufacturadoResponse[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Traer los productos del backend
  const fetchProductos = async () => {
    try {
      setLoading(true);

      const data = await ManufacturadoService.getAll();

      setProductos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  // Accion de botones
  const cargarProductos = async () => {
    fetchProductos();
  };

  const crearProducto = () => {
    navigate("crear");
  };

  // Cuando los datos esten cargando muestra la pantalla de carga
  if (loading) return <FullPageLoader />;

  return (
    <Container fluid="lg">
      <div className="py-4 d-flex align-items-center gap-5 flex-wrap">
        <Typography
          component="h2"
          variant="h5"
          fontWeight="bold"
        >
          Productos
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
        data={productos}
        columns={columns}
      />
    </Container>
  );
};
