import { api } from "@apis/api";
import type {
  ArticuloManufacturadoRequest,
  ArticuloManufacturadoResponse,
} from "@dtos/ArticuloManufacturado/ArticuloManufacturadoDtos";
import {buildFormData} from "@assets/helpers/buildFormData.ts";

export const ManufacturadoService = {
  getAll: async () => {
    try {
      const response = await api.get<ArticuloManufacturadoResponse[]>(
        "articulo_manufacturado"
      );

      return response.data;
    } catch (error) {
      console.log("Error al traer todos los articulos manufacturados: ", error);
      throw error;
    }
  },

  getOne: async (id: number) => {
    try {
      const response = await api.get<ArticuloManufacturadoResponse>(
        `articulo_manufacturado/${id}`
      );

      return response.data;
    } catch (error) {
      console.log("Error al traer el articulo manufacturado: ", error);
      throw error;
    }
  },

  create: async (
      producto: ArticuloManufacturadoRequest,
      imagenFile: File | null
  ): Promise<ArticuloManufacturadoResponse> => {
    try {
      const formData = new FormData();

      if (imagenFile) {
        formData.append("imagenFile", imagenFile);
      }

      buildFormData(producto, formData);

      const response = await api.post<ArticuloManufacturadoResponse>(
          "articulo_manufacturado",
          formData
      );

      return response.data;
    } catch (error) {
      console.error(`Error creating ArticuloManufacturado:`, error);
      throw error;
    }
  }
};
