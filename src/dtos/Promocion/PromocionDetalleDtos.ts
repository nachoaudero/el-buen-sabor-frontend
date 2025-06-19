import type {AssignToRelationsDto} from "@dtos/BaseDtos.ts";
import type {ArticuloInsumoRelation} from "@dtos/ArticuloInsumo";
import type {ArticuloManufacturadoRelation} from "@dtos/ArticuloManufacturado";

export interface PromocionDetalleRelation extends AssignToRelationsDto {
    cantidad: number;

    articuloInsumo?: ArticuloInsumoRelation;
    articuloManufacturado?: ArticuloManufacturadoRelation;
}