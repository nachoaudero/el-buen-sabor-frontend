// src/components/common/LandingComponents/MapaLocal.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Container, Row, Col } from "react-bootstrap";

// Icono personalizado (opcional)
const icon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [38, 38],
});

export const MapaLocal = () => {
  const position: [number, number] = [-31.4167, -64.1833]; // Córdoba Capital, Argentina (ejemplo)

  return (
    <Container className="my-5">
      <Row className="g-4 align-items-center">
        {/* DATOS DEL LOCAL */}
        <Col md={5}>
          <h4 className="fw-bold">Dónde estamos</h4>
          <p><strong>Dirección:</strong> Av. Siempre Viva 742, Córdoba, Argentina</p>
          <p><strong>Teléfono:</strong> +54 351 123-4567</p>
          <p><strong>Horario:</strong> Lun a Dom de 12:00 a 23:30</p>
          <p><strong>Email:</strong> contacto@elbuensabor.com</p>
        </Col>

        {/* MAPA */}
        <Col md={7}>
          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={icon}>
              <Popup>
                El Buen Sabor <br /> ¡Te esperamos!
              </Popup>
            </Marker>
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};
