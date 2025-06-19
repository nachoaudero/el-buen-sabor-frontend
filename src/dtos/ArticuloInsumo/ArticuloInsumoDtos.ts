import type {
  AssignToRelationsDto,
  RequestDTO,
  ResponseDto,
} from "@dtos/BaseDtos";
import type { UnidadMedidaRelation } from "@dtos/UnidadMedida/UnidadMedidaDtos.ts";
import type { ArticuloInsumoRubroRelation } from "./ArticuloInsumoRubroDtos";

// ARTICULO INSUMO RESPONSE
export interface ArticuloInsumoResponse extends ResponseDto {
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  esParaElaborar: boolean;
  imagen: string | null;
  stock: number;
  stockMinimo: number;
  articuloInsumoRubro: ArticuloInsumoRubroRelation;
  unidadMedida: UnidadMedidaRelation;
}

// ARTICULO INSUMO REQUEST
export interface ArticuloInsumoRequest extends RequestDTO {
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number | null;
  esParaElaborar: boolean;
  imagen?: string | null;
  stock: number;
  stockMinimo: number;
  articuloInsumoRubro: ArticuloInsumoRubroRelation;
  unidadMedida: UnidadMedidaRelation;
}

// ARTICULO INSUMO RELACION
export interface ArticuloInsumoRelation extends AssignToRelationsDto {
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number | null;
  esParaElaborar: boolean;
  imagen: string | null;
  stock: number;
  stockMinimo: number;
  articuloInsumoRubro: ArticuloInsumoRubroRelation;
  unidadMedida: UnidadMedidaRelation;
}

export interface InsumoCrearDetallePedido {
  id: number;
}
