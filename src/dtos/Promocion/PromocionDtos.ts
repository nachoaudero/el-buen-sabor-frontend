import type {PromocionDetalleRelation} from "@dtos/Promocion/PromocionDetalleDtos.ts";
import type {AssignToRelationsDto, RequestDTO, ResponseDto} from "@dtos/BaseDtos.ts";

export interface PromocionRequest extends RequestDTO {
    denominacion: string;
    descripcion: string;
    fechaDesde: Date;
    fechaHasta: Date;
    precioVenta: number;
    imagen?: string;
    descuento: number;
    detalles: PromocionDetalleRelation[];
}

export interface PromocionResponse extends ResponseDto {
    denominacion: string;
    descripcion: string;
    fechaDesde: Date;
    fechaHasta: Date;
    precioVenta: number;
    imagen: string;
    descuento: number;
    detalles: PromocionDetalleRelation[];
}

export interface PromocionRelation extends AssignToRelationsDto {
    denominacion: string;
    descripcion: string;
    fechaDesde: Date;
    fechaHasta: Date;
    precioVenta: number;
    imagen: string;
    descuento: number;
    detalles: PromocionDetalleRelation[];
}

export interface PromocionCrearDetallePedido {
    id: number
}

