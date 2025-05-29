import { GenericTable } from "@components/common/GenericTable";
import { FullPageLoader } from "@components/common/Loaders";
import type { ArticuloInsumoResponse } from "@dtos/ArticuloInsumo";
import type {
  ArticuloManufacturadoDetalleRequest,
  ArticuloManufacturadoRequest,
  ArticuloManufacturadoRubroResponse,
} from "@dtos/ArticuloManufacturado";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { productoSchema } from "@schemas/producto.schema";
import { InsumoService } from "@services/ArticuloInsumo";
import {
  ManufacturadoRubroService,
  ManufacturadoService,
} from "@services/ArticuloManufacturado";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { AgregarInsumoModal } from "./AgregarInsumoModal";

export const ProductoCrearEditar = () => {
  const [loading, setLoading] = useState(false);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof productoSchema>>({
    resolver: zodResolver(productoSchema),
  });
  const [errorInsumo, setErrorInsumo] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setErrorInsumo(null);
      if (productoInsumo.length === 0) {
        setErrorInsumo("Debes ingresar al menos un ingrediente.");
        return;
      }

      const productoNuevo: ArticuloManufacturadoRequest = {
        ...formData,
        precioCompra: calcularCostoTotal(),
        detalles: productoInsumo,
      };

      console.log(productoNuevo);

      const data = await ManufacturadoService.create(productoNuevo, imagenFile);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });

  // Estados para los rubros y los insumos
  const [insumos, setInsumos] = useState<ArticuloInsumoResponse[]>([]);
  const [productosRubros, setProductosRubros] = useState<
    ArticuloManufacturadoRubroResponse[]
  >([]);

  // Agregar insumo
  const [productoInsumo, setProductoInsumo] = useState<
    ArticuloManufacturadoDetalleRequest[]
  >([]);
  const [insumoSeleccionadoId, setInsumoSeleccionadoId] = useState<
    number | null
  >(null);
  const [cantidad, setCantidad] = useState<number>(0);

  const handleAgregarInsumo = () => {
    const insumo = insumos.find((i) => i.id === insumoSeleccionadoId);
    if (!insumo) return;

    const nuevoInsumo: ArticuloManufacturadoDetalleRequest = {
      cantidad,
      articuloInsumo: insumo,
    };

    setProductoInsumo((prev) => [...prev, nuevoInsumo]);
    setShowModal(false);
    setErrorInsumo(null);
  };

  // Calcular costo total insumos
  const calcularCostoTotal = () => {
    return productoInsumo.reduce((total, item) => {
      return total + item.cantidad * item.articuloInsumo.precioCompra;
    }, 0);
  };

  // Eliminar insumo
  const handleEliminarInsumo = (idInsumo: number) => {
    setProductoInsumo((prev) =>
      prev.filter((detalle) => detalle.articuloInsumo.id !== idInsumo)
    );
  };

  // MODAL
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setInsumoSeleccionadoId(null);
    setCantidad(0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Estado para hacer el preview de la imagen
  const [imagenFile, setImagenFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagenFile(e.target.files[0]);
    } else {
      setImagenFile(null);
    }
  };

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);

      const dataRubros = await ManufacturadoRubroService.getAll();

      console.log(dataRubros);
      setProductosRubros(dataRubros);

      const dataInsumos = await InsumoService.getAll();

      console.log(dataInsumos);
      setInsumos(dataInsumos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Cuando los datos esten cargando muestra la pantalla de carga
  if (loading) return <FullPageLoader />;

  return (
    <Container fluid="xl">
      <Row className="text-center pb-5">
        <Typography
          component="h2"
          variant="h5"
          fontWeight="bold"
        >
          Crear nuevo producto
        </Typography>
      </Row>
      <Form onSubmit={onSubmit}>
        <Row>
          {/* IMAGEN */}
          <Col
            md={6}
            className="px-4 pb-4"
          >
            {imagenFile ? (
              <div className="mb-3">
                <Image
                  src={URL.createObjectURL(imagenFile)}
                  alt={"imagen"}
                  rounded
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="mb-3">
                <div className="bg-dark text-light w-100 text-center py-5 rounded">
                  Preview de la imagen
                </div>
              </div>
            )}
            <Form.Group>
              <Form.Label>Imagen del producto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Form.Text>Seleccione una imagen para el producto.</Form.Text>
            </Form.Group>
          </Col>

          {/* FORMULARIO */}
          <Col
            md={6}
            className="px-4 pb-4"
          >
            <Form.Group className="mb-3">
              {/* NOMBRE */}
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                {...register("denominacion")}
                isInvalid={!!errors.denominacion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.denominacion?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* DESCRIPCION */}
            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                {...register("descripcion")}
                isInvalid={!!errors.descripcion}
                rows={3}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descripcion?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* PRECIO VENTA */}
            <Form.Group className="mb-3">
              <Form.Label>Precio de venta</Form.Label>
              <Form.Control
                type="number"
                step="any"
                {...register("precioVenta", { valueAsNumber: true })}
                isInvalid={!!errors.precioVenta}
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.precioVenta?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* RUBRO */}
            <Form.Group className="mb-3">
              <Form.Label>Rubro</Form.Label>
              <Form.Select
                {...register("articuloManufacturadoRubro.id", {
                  valueAsNumber: true,
                })}
                isInvalid={!!errors.articuloManufacturadoRubro?.id}
              >
                <option value={0}>Seleccione un rubro</option>
                {productosRubros.map((rubro) => (
                  <option
                    key={rubro.id}
                    value={rubro.id}
                  >
                    {rubro.denominacion}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Seleccione una Categoria.
              </Form.Control.Feedback>
            </Form.Group>

            {/* TIEMPO ESTIMADO */}
            <Form.Group className="mb-3">
              <Form.Label>Tiempo en cocina (minutos)</Form.Label>
              <Form.Control
                type="number"
                step="any"
                {...register("tiempoEstimado", { valueAsNumber: true })}
                isInvalid={!!errors.tiempoEstimado}
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.tiempoEstimado?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* AGREGAR INSUMOS */}
          <Col className="px-4 pb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <p className="mb-0 fw-bold">Ingredientes</p>
              <IconButton
                onClick={handleOpenModal}
                color="primary"
              >
                <AddCircle />
              </IconButton>
            </div>
            {productoInsumo.length > 0 ? (
              <>
                <GenericTable
                  data={productoInsumo}
                  columns={[
                    {
                      header: "Nombre",
                      accessorKey: "articuloInsumo.denominacion",
                    },
                    {
                      header: "Unidad de medida",
                      accessorKey: "articuloInsumo.unidadMedida.denominacion",
                    },
                    { header: "Cantidad", accessorKey: "cantidad" },
                    {
                      header: "Costo",
                      accessorFn: (row) =>
                        `$ ${row.cantidad * row.articuloInsumo.precioCompra}`,
                    },
                    {
                      header: "Acciones",
                      Cell: ({ row }) => (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleEliminarInsumo(row.original.articuloInsumo.id)
                          }
                        >
                          Eliminar
                        </Button>
                      ),
                    },
                  ]}
                />

                <div className="pt-5 px-sm-5 d-flex justify-content-between">
                  <div>Costo total:</div>
                  <div>$ {calcularCostoTotal().toFixed(2)}</div>
                </div>
              </>
            ) : (
              <div className="text-muted">No hay ingredientes cargados.</div>
            )}

            {errorInsumo && (
              <p className="text-danger pt-3">
                Debes cargar al menos un ingrediente
              </p>
            )}

            <AgregarInsumoModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              insumoSeleccionadoId={insumoSeleccionadoId}
              setInsumoSeleccionadoId={setInsumoSeleccionadoId}
              insumos={insumos}
              cantidad={cantidad}
              setCantidad={setCantidad}
              handleAgregarInsumo={handleAgregarInsumo}
            />
          </Col>
          <Col
            xs={12}
            className="text-center"
          >
            <Button
              type="submit"
              variant="primary"
            >
              Crear producto
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
