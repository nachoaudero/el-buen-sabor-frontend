import { z } from "zod";

export const insumoSchema = z.object({
  denominacion: z.string().min(1, "Campo requerido"),
  descripcion: z.string().min(1, "Requerido"),
  precioCompra: z
    .number({ invalid_type_error: "Requerido" })
    .min(0, "Debe ser mayor a 0"),
  esParaElaborar: z.boolean(),
  // precioVenta: z
  //   .number({ invalid_type_error: "Requerido" })
  //   .nullable()
  //   .optional(),
  stockMinimo: z
    .number({ invalid_type_error: "Requerido" })
    .min(0, "Debe ser mayor a 0"),
  unidadMedida: z.object({ id: z.number() }),
  articuloInsumoRubro: z.object({ id: z.number() }),
});
