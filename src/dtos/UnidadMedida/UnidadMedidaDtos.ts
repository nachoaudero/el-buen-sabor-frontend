import type { AssignToRelationsDto, ResponseDto } from "../BaseDtos.ts";

// UNIDAD MEDIDA RESPONSE
export interface UnidadMedidaResponse extends ResponseDto {
  denominacion: string;
}

// UNIDAD MEDIDA REQUEST
export interface UnidadMedidaRequest {
  denominacion: string;
}

// UNIDAD MEDIDA RELACION
export interface UnidadMedidaRelation extends AssignToRelationsDto {
  denominacion?: string;
}
