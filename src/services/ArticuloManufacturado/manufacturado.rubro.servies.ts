import { api } from "@apis/api";
import type {
  ArticuloManufacturadoRubroRequest,
  ArticuloManufacturadoRubroResponse,
} from "@dtos/ArticuloManufacturado/ArticuloManufacturadoRubroDtos";

export const ManufacturadoRubroService = {
  getAll: async (): Promise<ArticuloManufacturadoRubroResponse[]> => {
    try {
      const response = await api.get<ArticuloManufacturadoRubroResponse[]>(
        "articulo_manufacturado_rubro"
      );

      return response.data;
    } catch (error) {
      console.log(
        "Error al traer todos los rubros de articulos manufacturados: ",
        error
      );
      throw error;
    }
  },

  getOne: async (id: number): Promise<ArticuloManufacturadoRubroResponse> => {
    try {
      const response = await api.get<ArticuloManufacturadoRubroResponse>(
        `articulo_manufacturado_rubro/${id}`
      );

      return response.data;
    } catch (error) {
      console.log("Error al traer el rubro de articulo manufacturado: ", error);
      throw error;
    }
  },

  create: async (rubro: ArticuloManufacturadoRubroRequest) => {
    try {
      const response = await api.post<ArticuloManufacturadoRubroResponse>(
        "articulo_manufacturado_rubro",
        rubro
      );

      return response.data;
    } catch (error) {
      console.log(
        "Error al traer crear el rubro de articulo manufacturado: ",
        error
      );
      throw error;
    }
  },
};
