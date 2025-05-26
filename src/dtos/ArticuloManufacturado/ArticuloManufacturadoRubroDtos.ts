import type { AssignToRelationsDto, ResponseDto } from "@dtos/BaseDtos";

// ARTICULO MANUFACTURADO RUBRO RESPONSE
export interface ArticuloManufacturadoRubroResponse extends ResponseDto {
  denominacion: string;
}

// ARTICULO MANUFACTURADO RUBRO REQUEST
export interface ArticuloManufacturadoRubroRequest {
  denominacion: string;
}

// ARTICULO MANUFACTURADO RUBRO RELACION
export interface ArticuloManufacturadoRubroRelation
  extends AssignToRelationsDto {
  denominacion: string;
}
