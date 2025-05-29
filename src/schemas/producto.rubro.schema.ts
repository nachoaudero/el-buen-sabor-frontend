import { z } from "zod";

export const productoRubroSchema = z.object({
  denominacion: z.string().min(1, "Requerido"),
});
