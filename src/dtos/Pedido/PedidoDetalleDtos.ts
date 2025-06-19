import type {AssignToRelationsDto} from "@dtos/BaseDtos.ts";
import type {ArticuloInsumoRelation, InsumoCrearDetallePedido} from "@dtos/ArticuloInsumo";
import type {ArticuloManufacturadoRelation, ManufacturadoCrearDetallePedido} from "@dtos/ArticuloManufacturado";
import type {PromocionCrearDetallePedido, PromocionRelation} from "@dtos/Promocion";

export interface PedidoDetalleRelation extends AssignToRelationsDto {
    cantidad: number;
    subtotal: number;

    articuloInsumo?: ArticuloInsumoRelation;
    articuloManufacturado?: ArticuloManufacturadoRelation;
    promocion?: PromocionRelation;
}

export interface CrearPedidoDetalle {
    cantidad: number;
    subtotal: number;

    articuloInsumo?: InsumoCrearDetallePedido;
    articuloManufacturado?: ManufacturadoCrearDetallePedido;
    promocion?: PromocionCrearDetallePedido;
}