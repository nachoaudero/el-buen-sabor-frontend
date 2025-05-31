import { api } from "@apis/api";
import { buildFormData } from "@assets/helpers/buildFormData";
import type {
  ArticuloInsumoRequest,
  ArticuloInsumoResponse,
} from "@dtos/ArticuloInsumo/ArticuloInsumoDtos";

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

  create: async (insumo: ArticuloInsumoRequest, imagenFile: File | null) => {
    try {
      const formData = new FormData();

      if (imagenFile) {
        formData.append("imagenFile", imagenFile);
      }

      buildFormData(insumo, formData);

      await api.post("articulo_insumo", formData);
    } catch (error) {
      console.error("Error al crear el articulo insumo:", error);
      throw error;
    }
  },

  update: async (
    id: number,
    insumo: ArticuloInsumoRequest,
    imagenFile: File | null
  ) => {
    try {
      const formData = new FormData();

      if (imagenFile) {
        formData.append("imagenFile", imagenFile);
      }

      buildFormData(insumo, formData);

      await api.put(`articulo_insumo/${id}`, formData);
    } catch (error) {
      console.error("Error al crear el articulo insumo:", error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await api.delete(`articulo_insumo/${id}`);
    } catch (error) {
      console.error("Error al eliminar el articulo insumo:", error);
      throw error;
    }
  },
};
