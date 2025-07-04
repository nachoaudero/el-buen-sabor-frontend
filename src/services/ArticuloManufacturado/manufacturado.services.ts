import { api } from "@apis/api";
import { buildFormData } from "@assets/helpers/buildFormData.ts";
import type {
  ArticuloManufacturadoRequest,
  ArticuloManufacturadoResponse,
} from "@dtos/ArticuloManufacturado/ArticuloManufacturadoDtos";

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
  ) => {
    try {
      const formData = new FormData();

      if (imagenFile) {
        formData.append("imagenFile", imagenFile);
      }

      buildFormData(producto, formData);

      await api.post("articulo_manufacturado", formData);
    } catch (error) {
      console.error("Error al crear el articulo manufacturado:", error);
      throw error;
    }
  },

  update: async (
    id: number,
    producto: ArticuloManufacturadoRequest,
    imagenFile: File | null
  ) => {
    try {
      console.log(producto);
      const formData = new FormData();

      if (imagenFile) {
        formData.append("imagenFile", imagenFile);
      }

      buildFormData(producto, formData);

      await api.put(`articulo_manufacturado/${id}`, formData);
    } catch (error) {
      console.error("Error al crear el articulo manufacturado:", error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await api.delete(`articulo_manufacturado/${id}`);
    } catch (error) {
      console.error("Error al eliminar el articulo manufacturado:", error);
      throw error;
    }
  },
};
