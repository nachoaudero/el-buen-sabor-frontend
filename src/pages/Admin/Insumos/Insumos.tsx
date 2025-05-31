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
import { EliminarInsumoModal } from "./EliminarInsumoModal";

export const Insumos = () => {
  // REACT ROUTER
  const navigate = useNavigate();

  // Estado de los insumos
  const [insumos, setInsumos] = useState<ArticuloInsumoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [eliminarModal, setEliminarModal] = useState(false);
  const [insumoSeleccionado, setInsumoSeleccionado] =
    useState<ArticuloInsumoResponse | null>(null);

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

  // Eliminar producto
  const handleEliminarInsumo = (producto: ArticuloInsumoResponse) => {
    setInsumoSeleccionado(producto);
    setEliminarModal(true);
  };

  const confirmarEliminacion = async () => {
    if (!insumoSeleccionado) return;
    try {
      await InsumoService.delete(insumoSeleccionado.id);
      setEliminarModal(false);
      setInsumoSeleccionado(null);
      fetchInsumos();
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
      header: "Precio de compra",
    },
    {
      accessorFn: (row) => {
        if (row.precioVenta === null) {
          return "No se vende.";
        }
        return `$${row.precioVenta}`;
      },
      header: "Precio de venta",
    },
    {
      accessorKey: "stockMinimo",
      header: "Stock Minimo",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorFn: (row) => {
        return row.stock - row.stockMinimo;
      },
      header: "Diferencia",
    },
    {
      accessorKey: "unidadMedida.denominacion",
      header: "Unidad de medida",
    },
    {
      header: "Acciones",
      Cell: ({ row }) => (
        <div className="d-flex gap-2">
          <Button
            variant="warning"
            size="sm"
            onClick={() => navigate(`editar/${row.original.id}`)}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleEliminarInsumo(row.original)}
          >
            Eliminar
          </Button>
        </div>
      ),
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

      {insumos.length === 0 ? (
        <Typography variant="h6">No hay productos cargados.</Typography>
      ) : (
        <GenericTable
          data={insumos}
          columns={columns}
        />
      )}

      <EliminarInsumoModal
        eliminarModal={eliminarModal}
        setEliminarModal={setEliminarModal}
        insumoSeleccionado={insumoSeleccionado}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};
