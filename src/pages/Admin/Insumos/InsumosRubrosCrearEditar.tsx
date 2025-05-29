import type {
  ArticuloInsumoRubroRequest,
  ArticuloInsumoRubroResponse,
} from "@dtos/ArticuloInsumo";
import { Typography } from "@mui/material";
import { InsumoRubroService } from "@services/ArticuloInsumo";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const InsumosRubrosCrearEditar = () => {
  const [loading, setLoading] = useState(false);

  // Estado de los rubros de insumos
  const [insumosRubros, setInsumosRubros] = useState<
    ArticuloInsumoRubroResponse[]
  >([]);

  // REACT ROUTER
  const navigate = useNavigate();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticuloInsumoRubroRequest>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    // try {
    //   const data = await InsumoRubroService.create(formData);

    //   console.log(data);

    //   navigate("/ebs/admin/insumos/rubros");
    // } catch (error) {
    //   console.log(error);
    // }
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
  }, []);

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
            <Form.Group className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Rubro</Form.Label>
                <Form.Select>
                  <option value={0}>Seleccione un rubro</option>
                  {insumosRubros.map((rubro) => {
                    if (rubro.rubroPadre === null) {
                      return (
                        <option
                          key={rubro.id}
                          value={rubro.id}
                        >
                          {rubro.denominacion}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Seleccione una Categoria.
                </Form.Control.Feedback>
              </Form.Group>
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
