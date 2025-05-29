import type { ArticuloManufacturadoRubroRequest } from "@dtos/ArticuloManufacturado";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { productoRubroSchema } from "@schemas/producto.rubro.schema";
import { ManufacturadoRubroService } from "@services/ArticuloManufacturado";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const ProductosRubrosCrearEditar = () => {
  // REACT ROUTER
  const navigate = useNavigate();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticuloManufacturadoRubroRequest>({
    resolver: zodResolver(productoRubroSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const data = await ManufacturadoRubroService.create(formData);

      console.log(data);

      navigate("/ebs/admin/productos/rubros");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container fluid="xl">
      <Row className="text-center pb-5">
        <Typography
          component="h2"
          variant="h5"
          fontWeight="bold"
        >
          Rubro de productos
        </Typography>
      </Row>
      <Form onSubmit={onSubmit}>
        <Row className="justify-content-center">
          <Col md="6">
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
