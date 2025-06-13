import axios from "axios";
import type { Pedido } from "@/types/pedidos.types";
import type { CartItem } from "@/types/cart.types";

const API_URL = "http://localhost:8080/pedido";

export const pedidoService = {
  create: async (cartItems: CartItem[], total: number): Promise<Pedido> => {
    const pedido = {
      /*inicioPreparacion: new Date().toISOString(),
      finPreparacion: new Date().toISOString(),*/
      total: total,
      totalCosto: total / 2,
      estado: 0,
      tipoEnvio: 1,
      formaPago: 0,
      /*cliente: { id: 1 },
      cajero: { id: 2 },
      cocinero: { id: 3 },
      delivery: { id: 4 },*/

      detalles: cartItems.map((item) => ({
        cantidad: item.cantidad,
        subtotal: item.cantidad * item.precio,
        articuloManufacturado: { id: item.id },
      })),
    };

    const response = await axios.post<Pedido>(API_URL, pedido);
    return response.data;
  },

  getPedidoById: async (id: number): Promise<Pedido> => {
    const response = await axios.get<Pedido>(`${API_URL}/${id}`);
    return response.data;
  },
};
