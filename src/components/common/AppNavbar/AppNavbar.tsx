import { Person } from "@mui/icons-material";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";

export const AppNavbar = () => {
  return (
    <Navbar
      expand="md"
      bg="light"
      className="shadow-sm"
    >
      <Container
        fluid
        // className="justify-content-end justify-content-md-between"
      >
        {/* LOGO Y ROL LADO IZQUIERDO */}
        <Navbar.Brand className="d-none d-md-flex align-items-center gap-3 fw-bold">
          <img
            src="/src/assets/images/El buen sabor logo 2.png"
            width="55"
            height="55"
            className="d-inline-block align-top"
            alt="El buen sabor logo"
          />
          Administrador
        </Navbar.Brand>

        {/* NAVBAR MOBILE */}
        <Navbar.Brand className="d-flex d-md-none align-items-center gap-3 fw-bold">
          <img
            src="/src/assets/images/El buen sabor logo 2.png"
            width="55"
            height="55"
            className="d-inline-block align-top"
            alt="El buen sabor logo"
          />
        </Navbar.Brand>

        {/* BOTON PARA DESPLEGAR EL MENU */}
        <Navbar.Toggle />

        {/* NAVEGACION LADO DERECHO */}
        <Navbar.Collapse className="justify-content-end">
          {/* ROL DENTRO DEL COLLAPSE */}
          <Navbar.Brand className="d-flex d-md-none align-items-center gap-3 fw-bold">
            Administrador
          </Navbar.Brand>

          {/* NAV LINKS */}
          <Nav className="me-3">
            <Nav.Link className="text-black">Lista de pedidos</Nav.Link>
            <Nav.Link className="text-black">Informes</Nav.Link>
            <Nav.Link className="text-black">Usuarios</Nav.Link>
            <Nav.Link className="text-black">Cocina</Nav.Link>
          </Nav>

          {/* MENU USUARIO */}
          <Dropdown
            align={{ lg: "end" }}
            className="shadow-sm"
          >
            <Dropdown.Toggle
              variant="outline-primary"
              className="d-flex align-items-center gap-1"
            >
              <Person />
              Admin
            </Dropdown.Toggle>

            {/* DROPDOWN USUARIO */}
            <Dropdown.Menu>
              <Dropdown.Item>Pedidos a preparar</Dropdown.Item>
              <Dropdown.Item>Productos</Dropdown.Item>
              <Dropdown.Item>Rubro productos</Dropdown.Item>
              <Dropdown.Item>Insumos</Dropdown.Item>
              <Dropdown.Item>Rubro insumos</Dropdown.Item>
              <Dropdown.Item>Compra de insumos</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
