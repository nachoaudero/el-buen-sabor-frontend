import type { AssignToRelationsDto, ResponseDto } from "@dtos/BaseDtos";

// ARTICULO INSUMO RUBRO RESPONSE
export interface ArticuloInsumoRubroResponse extends ResponseDto {
  denominacion: string;
  rubroPadre: ArticuloInsumoRubroRelation | null;
}

// ARTICULO INSUMO RUBRO REQUEST
export interface ArticuloInsumoRubroRequest {
  denominacion: string;
  rubroPadre: AssignToRelationsDto | null;
}

// ARTICULO INSUMO RUBRO RELACION
export interface ArticuloInsumoRubroRelation extends AssignToRelationsDto {
  denominacion?: string;
}
