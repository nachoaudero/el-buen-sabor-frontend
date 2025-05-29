import type {AssignToRelationsDto, RequestDTO, ResponseDto} from "@dtos/BaseDtos";
import type { UnidadMedidaRelation } from "@dtos/UnidadMedidaDtos";
import type { ArticuloInsumoRubroRelation } from "./ArticuloInsumoRubroDtos";

// ARTICULO INSUMO RESPONSE
export interface ArticuloInsumoResponse extends ResponseDto {
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  esParaElaborar: boolean;
  imagen: File | null;
  stock: number;
  stockMinimo: number;
  articuloInsumoRubro: ArticuloInsumoRubroRelation;
  unidadMedida: UnidadMedidaRelation;
}

// ARTICULO INSUMO REQUEST
export interface ArticuloInsumoRequest extends RequestDTO{
  denominacion: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  esParaElaborar: boolean;
  imagen: File | null;
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
  imagen: File | null;
  stock: number;
  stockMinimo: number;
  articuloInsumoRubro: ArticuloInsumoRubroRelation;
  unidadMedida: UnidadMedidaRelation;
}
