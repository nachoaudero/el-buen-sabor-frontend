import { z } from "zod";

export const productoSchema = z.object({
  denominacion: z.string().min(1, "Requerido"),
  descripcion: z.string().min(1, "Requerido"),
  precioVenta: z
    .number({ invalid_type_error: "Requerido" })
    .min(0, "Debe ser mayor a 0"),
  tiempoEstimado: z
    .number({ invalid_type_error: "Requerido" })
    .min(0, "Debe ser mayor a 0"),
  articuloManufacturadoRubro: z.object({
    id: z.number().min(1, "Requerido"),
  }),
});
