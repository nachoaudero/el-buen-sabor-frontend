import { FullPageLoader } from "@components/common/Loaders";
import type { ArticuloInsumoRubroResponse } from "@dtos/ArticuloInsumo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { insumoRubroSchema } from "@schemas/insumo.rubro.schema";
import { InsumoRubroService } from "@services/ArticuloInsumo";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { z } from "zod";

export const InsumosRubrosCrearEditar = () => {
  const [loading, setLoading] = useState(false);

  // Estado de los rubros de insumos
  const [insumosRubros, setInsumosRubros] = useState<
    ArticuloInsumoRubroResponse[]
  >([]);
  const [selectedPadreId, setSelectedPadreId] = useState<number | "crear">(
    "crear"
  );

  // REACT ROUTER
  const navigate = useNavigate();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof insumoRubroSchema>>({
    resolver: zodResolver(insumoRubroSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await InsumoRubroService.create(formData);

      navigate("/ebs/admin/insumos/rubros");
    } catch (error) {
      console.log(error);
    }
  });

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

  useEffect(() => {
    fetchInsumosRubros();

    setSelectedPadreId("crear");
    setValue("rubroPadre", null);
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
          Rubro de insumos
        </Typography>
      </Row>
      <Form onSubmit={onSubmit}>
        <Row className="justify-content-center">
          <Col md="6">
            {/* RUBRO PADRE */}
            <Form.Group className="mb-3">
              <Form.Label>Rubro padre</Form.Label>
              <Form.Select
                value={selectedPadreId}
                onChange={(e) => {
                  const value =
                    e.target.value === "crear"
                      ? "crear"
                      : Number(e.target.value);
                  setSelectedPadreId(value);
                  setValue(
                    "rubroPadre",
                    value === "crear" ? null : { id: value }
                  );
                }}
              >
                <option value="crear">Crear rubro padre</option>
                {insumosRubros
                  .filter((r) => r.rubroPadre === null)
                  .map((rubro) => (
                    <option
                      key={rubro.id}
                      value={rubro.id}
                    >
                      {rubro.denominacion}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            {/* NOMBRE */}
            <Form.Group className="mb-3">
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
          </Col>
          <Col
            xs={12}
            className="text-center"
          >
            <Button
              type="submit"
              variant="primary"
            >
              Crear rubro
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
