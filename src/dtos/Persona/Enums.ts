export const Rol = {
    ADMIN: "ADMIN",
    EMPLEADO: "EMPLEADO",
    CLIENTE: "CLIENTE",
    DEVELOPER: "DEVELOPER",
    NO_ROL: "",
} as const;
export type Rol = typeof Rol[keyof typeof Rol];


export const Puesto = {
    ENCARGADO: "ENCARGADO",
    CAJERO: "CAJERO",
    COCINERO: "COCINERO",
    DELIVERY: "DELIVERY",
    NO_PUESTO: "",
} as const;
export type Puesto = typeof Puesto[keyof typeof Puesto]
