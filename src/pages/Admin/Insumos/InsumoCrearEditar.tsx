import { FullPageLoader } from "@components/common/Loaders";
import type {
  ArticuloInsumoRequest,
  ArticuloInsumoRubroResponse,
} from "@dtos/ArticuloInsumo";
import type { UnidadMedidaResponse } from "@dtos/UnidadMedida/UnidadMedidaDtos.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { insumoSchema } from "@schemas/insumo.schema";
import { InsumoRubroService, InsumoService } from "@services/ArticuloInsumo";
import { UnidadMedidaService } from "@services/unidad.medida.services";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import type { z } from "zod";

export const InsumoCrearEditar = () => {
  const [loading, setLoading] = useState(false);

  // REACT ROUTER
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof insumoSchema>>({
    resolver: zodResolver(insumoSchema),
  });

  const esParaElaborar = watch("esParaElaborar");

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const insumoNuevo: ArticuloInsumoRequest = {
        ...formData,
        precioVenta: esParaElaborar ? null : precioVenta,
        stock: 0,
        imagen: imagenURL,
      };

      if (isEditMode) {
        await InsumoService.update(Number(id), insumoNuevo, imagenFile);
      } else {
        await InsumoService.create(insumoNuevo, imagenFile);
      }

      navigate("/ebs/admin/insumos");
    } catch (error) {
      console.log(error);
    }
  });

  // Estados para los rubros y los insumos
  const [unidadMedida, setUnidadMedida] = useState<UnidadMedidaResponse[]>([]);
  const [insumosRubros, setInsumosRubros] = useState<
    ArticuloInsumoRubroResponse[]
  >([]);
  const [rubroPadreId, setRubroPadreId] = useState<number | "">("");
  const [precioVenta, setPrecioVenta] = useState<number>(0);

  const handleRubroPadreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value ? Number(e.target.value) : "";
    setRubroPadreId(selectedId);
  };

  const rubrosHijos = insumosRubros.filter(
    (r) => r.rubroPadre?.id === rubroPadreId
  );

  // Estado para hacer el preview de la imagen
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenURL, setImagenURL] = useState<string | null>(null);

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

      const dataRubros = await InsumoRubroService.getAll();

      setInsumosRubros(dataRubros);

      const dataUnidad = await UnidadMedidaService.getAll();

      setUnidadMedida(dataUnidad);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch el insumo por id
  const fetchInsumoById = async () => {
    try {
      setImagenURL(null);
      setLoading(true);
      const insumo = await InsumoService.getOne(Number(id));

      // Setear datos en react-hook-form
      reset({
        denominacion: insumo.denominacion,
        descripcion: insumo.descripcion,
        precioCompra: insumo.precioCompra,
        esParaElaborar: insumo.esParaElaborar,
        stockMinimo: insumo.stockMinimo,
        unidadMedida: {
          id: insumo.unidadMedida.id,
        },
        articuloInsumoRubro: {
          id: insumo.articuloInsumoRubro.id,
        },
      });

      const precioVentaInsumo =
        insumo.precioVenta !== null ? insumo.precioVenta : 0;

      setPrecioVenta(precioVentaInsumo);

      const rubroEntero = await InsumoRubroService.getOne(
        insumo.articuloInsumoRubro.id
      );

      setRubroPadreId(rubroEntero.rubroPadre!.id);

      // Setear imagen si la hay (asumiendo que es una URL)
      if (insumo.imagen) {
        setImagenURL(insumo.imagen);
      }
    } catch (error) {
      console.error("Error al cargar el producto", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (id) {
      fetchInsumoById();
    }
  }, [id]);

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
          {isEditMode ? "Editar ingrediente" : "Crear nuevo ingrediente"}
        </Typography>
      </Row>

      <Form onSubmit={onSubmit}>
        <Row>
          {/* IMAGEN */}
          <Col
            md={6}
            className="px-4 pb-4"
          >
            {imagenFile || imagenURL ? (
              <div className="mb-3">
                <Image
                  src={
                    imagenURL
                      ? `http://localhost:8080/imagenes/${imagenURL}`
                      : URL.createObjectURL(imagenFile!)
                  }
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

            {/* PRECIO COMPRA */}
            <Form.Group className="mb-3">
              <Form.Label>Precio de compra</Form.Label>
              <Form.Control
                type="number"
                step="any"
                {...register("precioCompra", { valueAsNumber: true })}
                isInvalid={!!errors.precioCompra}
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.precioCompra?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* ES PARA ELABORAR */}
            <Form.Group className="mb-3">
              <Form.Label>¿Es para elaborar?</Form.Label>
              <Form.Check
                type="switch"
                {...register("esParaElaborar")}
              />
            </Form.Group>

            {/* PRECIO VENTA */}
            {!esParaElaborar && (
              <Form.Group className="mb-3">
                <Form.Label>Precio Venta</Form.Label>
                <Form.Control
                  type="number"
                  value={precioVenta}
                  min="0"
                  onChange={(e) => setPrecioVenta(Number(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  {/* {errors.precioVenta?.message} */}
                </Form.Control.Feedback>
              </Form.Group>
            )}

            {/* STOCK MINIMO */}
            <Form.Group className="mb-3">
              <Form.Label>Stock minimo</Form.Label>
              <Form.Control
                type="number"
                step="any"
                {...register("stockMinimo", { valueAsNumber: true })}
                isInvalid={!!errors.stockMinimo}
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.stockMinimo?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* UNIDAD MEDIDA */}
            <Form.Group className="mb-3">
              <Form.Label>Unidad de Medida</Form.Label>
              <Form.Select
                {...register("unidadMedida.id", { valueAsNumber: true })}
              >
                {unidadMedida.map((u) => (
                  <option
                    key={u.id}
                    value={u.id}
                  >
                    {u.denominacion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* RUBRO PADRE */}
            <Form.Group className="mb-3">
              <Form.Label>Rubro padre</Form.Label>
              <Form.Select
                value={rubroPadreId}
                onChange={handleRubroPadreChange}
              >
                <option value="">Seleccionar rubro padre</option>
                {insumosRubros
                  .filter((r) => r.rubroPadre === null)
                  .map((r) => (
                    <option
                      key={r.id}
                      value={r.id}
                    >
                      {r.denominacion}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            {/* RUBRO HIJO */}
            {rubroPadreId !== "" && (
              <Form.Group className="mb-3">
                <Form.Label>Subrubro</Form.Label>
                <Form.Select
                  {...register("articuloInsumoRubro.id", {
                    valueAsNumber: true,
                  })}
                >
                  <option value="">Seleccionar subrubro</option>
                  {rubrosHijos.map((r) => (
                    <option
                      key={r.id}
                      value={r.id}
                    >
                      {r.denominacion}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
          </Col>

          {/* BOTON SUBMIT */}
          <Col
            xs={12}
            className="text-center"
          >
            <Button
              type="submit"
              variant="primary"
            >
              {isEditMode ? "Actualizar ingrediente" : "Crear ingrediente"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
