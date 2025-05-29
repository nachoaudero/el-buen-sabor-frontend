import type { ArticuloInsumoRelation } from "@dtos/ArticuloInsumo/ArticuloInsumoDtos";
import type { AssignToRelationsDto } from "@dtos/BaseDtos";

// ARTICULO MANUFACTURADO DETALLE REQUEST
export interface ArticuloManufacturadoDetalleRequest {
  cantidad: number;
  articuloInsumo: ArticuloInsumoRelation;
}

// ARTICULO MANUFACTURADO DETALLE RELACION
export interface ArticuloManufacturadoDetalleRelation
  extends AssignToRelationsDto {
  cantidad: number;
  articuloInsumo: ArticuloInsumoRelation;
}
