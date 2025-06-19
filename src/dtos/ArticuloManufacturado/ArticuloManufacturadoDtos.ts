import type {AssignToRelationsDto, RequestDTO, ResponseDto} from "@dtos/BaseDtos";
import type {
  ArticuloManufacturadoDetalleRelation,
  ArticuloManufacturadoDetalleRequest,
} from "./ArticuloManufacturadoDetalleDtos";
import type { ArticuloManufacturadoRubroRelation } from "./ArticuloManufacturadoRubroDtos";

// ARTICULO MANUFACTURADO RESPONSE
export interface ArticuloManufacturadoResponse extends ResponseDto {
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  imagen: string | null;
  tiempoEstimado: number;
  articuloManufacturadoRubro: ArticuloManufacturadoRubroRelation;
  detalles: ArticuloManufacturadoDetalleRelation[];
}

// ARTICULO MANUFACTURADO REQUEST
export interface ArticuloManufacturadoRequest extends RequestDTO{
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  imagen?: string | null;
  imagenFile?: File | null;
  tiempoEstimado: number;
  articuloManufacturadoRubro: ArticuloManufacturadoRubroRelation;
  detalles: ArticuloManufacturadoDetalleRequest[];
}

// ARTICULO MANUFACTURADO RELACION
export interface ArticuloManufacturadoRelation extends AssignToRelationsDto {
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  imagen: string | null;
  tiempoEstimado: number;
  articuloManufacturadoRubro: ArticuloManufacturadoRubroRelation;
  detalles: ArticuloManufacturadoDetalleRelation[];
}

export interface ManufacturadoCrearDetallePedido {
  id: number;
}
