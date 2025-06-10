import { useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router";
import { Person } from "@mui/icons-material";
import { BarraBusqueda } from "@/components/common/BarraBusqueda";
import type { ArticuloManufacturadoResponse } from "@dtos/ArticuloManufacturado";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/hooks/useCart";
import { ModalCarrito } from "@/components/common/Modals/ModalCarrito"; // modal del carrito

export const AppNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productos, setProductos] = useState<ArticuloManufacturadoResponse[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const { cartItems } = useCart();

  const [showCartModal, setShowCartModal] = useState(false); // estado para el modal carrito

  // Detectar si mostrar barra de búsqueda
  useEffect(() => {
    const path = location.pathname;
    const necesitaBusqueda = path === "/ebs" || path === "/menu";
    setShowSearch(necesitaBusqueda);

    if (necesitaBusqueda) {
      fetch("http://localhost:8080/articulo_manufacturado")
        .then((res) => res.json())
        .then(setProductos)
        .catch(() => alert("Error al cargar productos"));
    }
  }, [location.pathname]);

  const handleSelect = (producto: ArticuloManufacturadoResponse) => {
    navigate("/menu", { state: { productoFiltrado: producto } });
  };

  const enLanding = location.pathname === "/ebs";
  const esAdmin = location.pathname.includes("/admin");

  return (
    <Navbar expand="md" bg="light" className="shadow-sm py-2">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Navbar.Brand as={Link} to="/ebs" className="d-flex align-items-center gap-2">
          <img
            src="/src/assets/images/El buen sabor logo 2.png"
            width="45"
            height="45"
            alt="Logo"
          />
          <span className="fw-bold">El Buen Sabor</span>
        </Navbar.Brand>

        {/* Barra de búsqueda */}
        {showSearch && (
          <div className="flex-grow-1 mx-3" style={{ maxWidth: "600px" }}>
            <BarraBusqueda productos={productos} onSelect={handleSelect} placeholder="Buscar un plato..." />
          </div>
        )}

        <div className="d-flex align-items-center gap-2">
          {/* Botones Landing */}
          {enLanding && (
            <>
              <Button variant="outline-primary" onClick={() => alert("Login pendiente")}>
                Iniciar sesión
              </Button>
              <Button variant="primary" onClick={() => alert("Registro pendiente")}>
                Registrarse
              </Button>
            </>
          )}

          {/* Ícono del carrito */}
          {!esAdmin && (
            <Button
              variant="outline-secondary"
              className="position-relative"
              onClick={() => setShowCartModal(true)} // abre el modal
            >
              <ShoppingCartIcon fontSize="small" />
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.reduce((acc, item) => acc + item.cantidad, 0)}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Modal del carrito */}
        <ModalCarrito show={showCartModal} onHide={() => setShowCartModal(false)} />

        {/* Navegación admin */}
        {esAdmin && (
          <>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-3">
                <Nav.Link className="text-black">Lista de pedidos</Nav.Link>
                <Nav.Link className="text-black">Informes</Nav.Link>
                <Nav.Link className="text-black">Usuarios</Nav.Link>
                <Nav.Link className="text-black">Cocina</Nav.Link>
              </Nav>

              <Dropdown align={{ md: "end" }} className="shadow-sm">
                <Dropdown.Toggle variant="outline-primary" className="d-flex align-items-center gap-1">
                  <Person />
                  Admin
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/ebs/admin/productos">Productos</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/ebs/admin/productos/rubros">Rubro productos</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/ebs/admin/insumos">Insumos</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/ebs/admin/insumos/rubros">Rubro insumos</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/ebs/admin/insumos/compra">Compra de insumos</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};
