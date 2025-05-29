import { api } from "@apis/api";
import type { ArticuloInsumoRubroResponse } from "@dtos/ArticuloInsumo/ArticuloInsumoRubroDtos";

export const InsumoRubroService = {
  getAll: async (): Promise<ArticuloInsumoRubroResponse[]> => {
    try {
      const response = await api.get<ArticuloInsumoRubroResponse[]>(
        "articulo_insumo_rubro"
      );

      return response.data;
    } catch (error) {
      console.log(
        "Error al traer todos los rubros de articulos insumos: ",
        error
      );
      throw error;
    }
  },

  getOne: async (id: number): Promise<ArticuloInsumoRubroResponse> => {
    try {
      const response = await api.get<ArticuloInsumoRubroResponse>(
        `articulo_insumo_rubro/${id}`
      );

      return response.data;
    } catch (error) {
      console.log("Error al traer el rubro de articulo insumo: ", error);
      throw error;
    }
  },
};
