import { AppNavbar } from "@components/common/AppNavbar";
import { Outlet } from "react-router";

export const App = () => {
  return (
    <main className="d-flex flex-column min-vh-100">
      {/* NAVBAR */}
      <AppNavbar />

      {/* CONTENEDOR DE TODA LA APP */}
      <section className="flex-grow-1 my-5">
        {/* CONTENIDO DE LA RUTA */}
        <Outlet />
      </section>
    </main>
  );
};
