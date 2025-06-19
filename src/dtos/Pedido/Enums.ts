export const FormaPagoEnum = {
    NO_FORMA_PAGO: "NO_FORMA_PAGO",
    EFECTIVO: "EFECTIVO",
    MERCADOPAGO: "MERCADOPAGO"
} as const;
export type FormaPagoEnum = (typeof FormaPagoEnum)[keyof typeof FormaPagoEnum];


export const TipoEnvioEnum = {
    NO_TIPO_ENVIO: "NO_TIPO_ENVIO",
    DELIVERY: "DELIVERY",
    TAKEAWAY: "TAKEAWAY"
} as const;
export type TipoEnvioEnum = (typeof TipoEnvioEnum)[keyof typeof TipoEnvioEnum];

export const EstadoPedidoEnum = {
    NO_ESTADO: "NO_ESTADO",
    PENDIENTE_DE_PAGO: "PENDIENTE_DE_PAGO",
    PAGADO: "PAGADO",
    PREPARACION: "PREPARACION",
    LISTO_PARA_ENVIO: "LISTO_PARA_ENVIO",
    EN_VIAJE: "EN_VIAJE",
    ENTREGADO: "ENTREGADO",
    CANCELADO: "CANCELADO",
    RECHAZADO: "RECHAZADO"
} as const;
export type EstadoPedidoEnum = (typeof EstadoPedidoEnum)[keyof typeof EstadoPedidoEnum];

export const StatusMPEnum = {
    NO_STATUS: "NO_STATUS",
    PENDIENDE: "PENDIENTE",
    PAGADO: "PAGADO",
    CANCELADO: "CANCELADO"
} as const;
export type StatusMPEnum = (typeof StatusMPEnum)[keyof typeof StatusMPEnum]

