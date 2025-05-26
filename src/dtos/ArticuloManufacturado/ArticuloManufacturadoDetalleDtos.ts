import type { ArticuloInsumoRelation } from "@dtos/ArticuloInsumo/ArticuloInsumoDtos";
import type { AssignToRelationsDto } from "@dtos/BaseDtos";

// ARTICULO MANUFACTURADO DETALLE RELACION
export interface ArticuloManufacturadoDetalleRelation
  extends AssignToRelationsDto {
  cantidad: string;
  articuloInsumo: ArticuloInsumoRelation[];
}
