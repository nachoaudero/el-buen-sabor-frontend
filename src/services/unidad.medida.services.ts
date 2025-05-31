import { api } from "@apis/api";
import type { UnidadMedidaResponse } from "@dtos/UnidadMedidaDtos";

export const UnidadMedidaService = {
  getAll: async () => {
    try {
      const response = await api.get<UnidadMedidaResponse[]>("unidad_medida");

      return response.data;
    } catch (error) {
      console.log("Error al traer todas las unidades de medidas: ", error);
      throw error;
    }
  },
};
