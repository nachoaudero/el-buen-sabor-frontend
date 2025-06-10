// src/main.tsx
import { router } from "@routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "leaflet/dist/leaflet.css";
import { CartProvider } from "@/context/cart/CartProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
