import { Person } from "@mui/icons-material";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";

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
        {/* LOGO */}
        <Navbar.Brand
          className="align-items-center gap-3 fw-bold"
          as={Link}
          to="/ebs"
        >
          <img
            src="/src/assets/images/El buen sabor logo 2.png"
            width="55"
            height="55"
            className="d-inline-block align-top"
            alt="El buen sabor logo"
          />
        </Navbar.Brand>

        {/* ROL */}
        <Navbar.Brand className="d-none d-md-flex align-items-center gap-3 fw-bold">
          Administrador
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
          <Dropdown align={{ md: "end" }}>
            <Dropdown.Toggle
              variant="outline-primary"
              className="d-flex align-items-center gap-1"
            >
              <Person />
              Admin
            </Dropdown.Toggle>

            {/* DROPDOWN USUARIO */}
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="admin/pedidos"
              >
                Pedidos a preparar
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="admin/productos"
              >
                Productos
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="admin/productos/rubros"
              >
                Rubro productos
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="admin/insumos"
              >
                Insumos
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="admin/insumos/rubros"
              >
                Rubro insumos
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="admin/insumos/compra"
              >
                Compra de insumos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
