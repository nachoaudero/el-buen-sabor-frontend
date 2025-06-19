import {api} from "@apis/api.ts";
import type {PedidoRequest, PedidoResponse} from "@dtos/Pedido/PedidoDtos.ts";
import type { CartItem } from "@/types/cart.types.ts";
import type {CrearPedidoDetalle} from "@dtos/Pedido/PedidoDetalleDtos.ts";

export const pedidoService = {
  create: async (cartItems: CartItem[], total: number): Promise<PedidoResponse> => {
    const detallePedido: CrearPedidoDetalle[] = [];


    cartItems.map((item) => {
      if (item.tipo === "insumo") {
        detallePedido.push({
          cantidad: item.cantidad,
          subtotal: item.cantidad * item.precio,
          articuloInsumo: {
            id: item.id
          }
        })
      } else if (item.tipo === "manufacturado") {
        detallePedido.push({
          cantidad: item.cantidad,
          subtotal: item.cantidad * item.precio,
          articuloManufacturado: {
            id: item.id
          }
        })
      } else {
        detallePedido.push({
          cantidad: item.cantidad,
          subtotal: item.cantidad * item.precio,
          promocion: {
            id: item.id
          }
        })
      }
    })


    const pedido : PedidoRequest = {
      total: total,
      estado: "NO_ESTADO",
      tipoEnvio: "NO_TIPO_ENVIO",
      formaPago: "NO_FORMA_PAGO",
      statusMP: "NO_STATUS",
      isAnulado: false,

      detalles: detallePedido
    };

    const response = await api.post<PedidoResponse>("pedido", pedido);
    return response.data;
  },

  getPedidoById: async (id: number): Promise<PedidoResponse> => {
    const response = await api.get<PedidoResponse>(`pedido/${id}`);
    return response.data;
  },
};
