import { z } from "zod";

export const insumoRubroSchema = z.object({
  denominacion: z.string().min(1, "Requerido"),
});
