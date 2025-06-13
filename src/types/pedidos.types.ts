export interface PedidoDetalle {
  cantidad: number;
  subtotal: number;
  articuloInsumo?: {
    id: number;
  };
  articuloManufacturado?: {
    id: number;
  };
}

export interface Pedido {
  id: number;
  estado: number;
  total: number;
  detalles: PedidoDetalle[];
}
