import { api } from "@apis/api";
import type {
  ArticuloInsumoRubroRequest,
  ArticuloInsumoRubroResponse,
} from "@dtos/ArticuloInsumo/ArticuloInsumoRubroDtos";

export const InsumoRubroService = {
  getAll: async () => {
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

  getOne: async (id: number) => {
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

  create: async (rubro: ArticuloInsumoRubroRequest) => {
    try {
      await api.post("articulo_insumo_rubro", rubro);
    } catch (error) {
      console.log("Error al crear el rubro de articulo insumo: ", error);
      throw error;
    }
  },
};
