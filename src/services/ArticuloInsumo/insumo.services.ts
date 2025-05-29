import { api } from "@apis/api";
import type { ArticuloInsumoResponse } from "@dtos/ArticuloInsumo/ArticuloInsumoDtos";

export const InsumoService = {
  getAll: async (): Promise<ArticuloInsumoResponse[]> => {
    try {
      const response = await api.get<ArticuloInsumoResponse[]>(
        "articulo_insumo"
      );

      return response.data;
    } catch (error) {
      console.log("Error al traer todos los articulos insumos: ", error);
      throw error;
    }
  },

  getOne: async (id: number): Promise<ArticuloInsumoResponse> => {
    try {
      const response = await api.get<ArticuloInsumoResponse>(
        `articulo_insumo/${id}`
      );

      return response.data;
    } catch (error) {
      console.log("Error al traer el articulo insumo: ", error);
      throw error;
    }
  },
};
