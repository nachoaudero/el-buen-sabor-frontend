import { App } from "@/App";
import {
  InsumoCrearEditar,
  Insumos,
  InsumosRubros,
  InsumosRubrosCrearEditar,
} from "@pages/Admin/Insumos";
import {
  ProductoCrearEditar,
  Productos,
  ProductosRubros,
  ProductosRubrosCrearEditar,
} from "@pages/Admin/Productos";
import { Home } from "@pages/Home";
import Menu from "@pages/Menu"; // ✅ import correcto (default export)
import Carrito from "@pages/Carrito"; // ✅ import correcto (default export)
import Pedido from "@pages/Pedido";
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
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "carrito",
        element: <Carrito />,
      },
      {
        path: "pedido/:id",
        element: <Pedido />,
      },

      // RUTAS DE ADMINISTRADOR (falta proteger la ruta usando el ProtectedRoute)
      {
        path: "admin",
        children: [
          {
            path: "productos",
            children: [
              {
                index: true,
                element: <Productos />,
              },
              {
                path: "crear",
                element: <ProductoCrearEditar />,
              },
              {
                path: "editar/:id",
                element: <ProductoCrearEditar />,
              },
              {
                path: "rubros",
                children: [
                  {
                    index: true,
                    element: <ProductosRubros />,
                  },
                  {
                    path: "crear",
                    element: <ProductosRubrosCrearEditar />,
                  },
                ],
              },
            ],
          },
          {
            path: "insumos",
            children: [
              {
                index: true,
                element: <Insumos />,
              },
              {
                path: "crear",
                element: <InsumoCrearEditar />,
              },
              {
                path: "editar/:id",
                element: <InsumoCrearEditar />,
              },
              {
                path: "rubros",
                children: [
                  {
                    index: true,
                    element: <InsumosRubros />,
                  },
                  {
                    path: "crear",
                    element: <InsumosRubrosCrearEditar />,
                  },
                ],
              },
            ],
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

  // RUTA NO ENCONTRADA GLOBAL, REDIRECCIONA A LA RUTA RAIZ
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
