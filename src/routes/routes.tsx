import { App } from "@/App";
import { Productos } from "@pages/Admin";
import { Insumos } from "@pages/Admin/Insumos";
import { InsumosRubros } from "@pages/Admin/InsumosRubros";
import { ProductosRubros } from "@pages/Admin/ProductosRubros";
import { Home } from "@pages/Home";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/ebs", // ebs -> el buen sabor
    element: <App />,
    children: [
      // RUTAS GLOBALES
      {
        index: true,
        element: <Home />,
      },

      // RUTAS DE ADMINISTRADOR (falta proteger la ruta usando el ProtectedRoute)
      {
        path: "admin",
        children: [
          {
            path: "productos",
            element: <Productos />,
          },
          {
            path: "productos/rubros",
            element: <ProductosRubros />,
          },
          {
            path: "insumos",
            element: <Insumos />,
          },
          {
            path: "insumos/rubros",
            element: <InsumosRubros />,
          },
        ],
      },

      // RUTA NO ENCONTRADA, REDIRECCIONA A LA RUTA RAIZ
      {
        path: "*",
        element: (
          <Navigate
            to="/ebs"
            replace
          />
        ),
      },
    ],
  },

  // RUTA NO ENCONTRADA, REDIRECCIONA A LA RUTA RAIZ
  {
    path: "*",
    element: (
      <Navigate
        to="/ebs"
        replace
      />
    ),
  },
]);
