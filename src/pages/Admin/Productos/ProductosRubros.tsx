import { GenericTable } from "@components/common/GenericTable";
import { FullPageLoader } from "@components/common/Loaders";
import type { ArticuloManufacturadoRubroResponse } from "@dtos/ArticuloManufacturado";
import { Refresh } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { ManufacturadoRubroService } from "@services/ArticuloManufacturado";
import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export const ProductosRubros = () => {
  // REACT ROUTER
  const navigate = useNavigate();

  // Estado de los rubros de productos
  const [productosRubros, setProductosRubros] = useState<
    ArticuloManufacturadoRubroResponse[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Traer los rubros del backend
  const fetchProductosRubros = async () => {
    try {
      setLoading(true);

      const data = await ManufacturadoRubroService.getAll();

      setProductosRubros(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Accion de botones
  const cargarProductos = async () => {
    fetchProductosRubros();
  };

  const crearProducto = () => {
    navigate("crear");
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
          Rubro de productos
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
        data={productosRubros}
        columns={columns}
        title="Rubros de productos"
      />
    </Container>
  );
};
