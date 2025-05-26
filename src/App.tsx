import { AppNavbar } from "@components/common/AppNavbar";
import { AdminPage } from "@pages/AdminPage";
import { Container } from "react-bootstrap";

export const App = () => {
  return (
    <main className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <Container
        fluid="md"
        className="flex-grow-1 my-5"
        as="main"
      >
        <AdminPage />
      </Container>
    </main>
  );
};
