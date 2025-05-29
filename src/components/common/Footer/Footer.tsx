import {
  Email,
  Facebook,
  Instagram,
  LocationOn,
  PhoneInTalk,
  WhatsApp,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <Container
      as="footer"
      fluid
      className="bg-dark pt-3 pb-2"
    >
      <Container fluid="lg">
        <Row>
          <Col
            className="text-center"
            lg={4}
          >
            <img
              src="/src/assets/images/El buen sabor logo.png"
              alt="El buen sabor logo"
              width="150px"
            />
          </Col>
          <Col
            className="pt-3 d-flex flex-column gap-3 align-items-center"
            sm={6}
            lg={4}
          >
            <Typography className="text-light text-decoration-underline fw-bold">
              Medios de contacto
            </Typography>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-2">
                <PhoneInTalk className="text-light" />
                <WhatsApp className="text-light" />
                <Typography className="text-light">+54 261 123123</Typography>
              </div>
              <div className="d-flex gap-2">
                <Email className="text-light" />
                <Typography className="text-light">
                  pippsas@gmail.com
                </Typography>
              </div>
              <div className="d-flex gap-2">
                <LocationOn className="text-light" />
                <Typography className="text-light">
                  Avenida Pippsas 346, Mendoza
                </Typography>
              </div>
            </div>
          </Col>
          <Col
            className="pt-3 d-flex flex-column gap-3 align-items-center"
            sm={6}
            lg={4}
          >
            <Typography className="text-light text-decoration-underline fw-bold">
              Seguinos en nuestras redes
            </Typography>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-2">
                <Instagram className="text-light" />
                <Typography className="text-light">
                  @pippsas_dashboard
                </Typography>
              </div>
              <div className="d-flex gap-2">
                <Facebook className="text-light" />
                <Typography className="text-light">
                  pippsas_dashboard
                </Typography>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="align-items-center text-center pt-3">
            <Typography className="text-dark-emphasis fw-bold">
              Develop by Desempleados SA - 2025
            </Typography>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
