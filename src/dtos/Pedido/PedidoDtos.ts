import type {CrearPedidoDetalle, PedidoDetalleRelation} from "@dtos/Pedido/PedidoDetalleDtos.ts";
import type {AssignToRelationsDto, RequestDTO, ResponseDto} from "@dtos/BaseDtos.ts";
import {type EstadoPedidoEnum, FormaPagoEnum, type StatusMPEnum, TipoEnvioEnum} from "@dtos/Pedido/Enums.ts";
import type {PersonaClienteRelation, PersonaEmpleadoRelation} from "@dtos/Persona";

export interface PedidoResponse extends ResponseDto {
  inicioPreparacion?: Date;
  finPreparacion?: Date;
  total: number;
  totalCosto?: number;
  estado: EstadoPedidoEnum;
  tipoEnvio: TipoEnvioEnum;
  formaPago: FormaPagoEnum;
  isAnulado: boolean;
  mpPreferenceId?: string;
  statusMP: StatusMPEnum;

  cliente: PersonaClienteRelation;
  cajero: PersonaEmpleadoRelation;
  cocinero: PersonaEmpleadoRelation;
  delivery: PersonaEmpleadoRelation;

  detalles: PedidoDetalleRelation[];
}

export interface PedidoRequest extends RequestDTO {
  inicioPreparacion?: Date;
  finPreparacion?: Date;
  total: number;
  totalCosto?: number;
  estado: EstadoPedidoEnum;
  tipoEnvio: TipoEnvioEnum;
  formaPago: FormaPagoEnum;
  isAnulado: boolean;
  mpPreferenceId?: string;
  statusMP: StatusMPEnum;

  cliente?: PersonaClienteRelation;
  cajero?: PersonaEmpleadoRelation;
  cocinero?: PersonaEmpleadoRelation;
  delivery?: PersonaEmpleadoRelation;

  detalles: PedidoDetalleRelation[] | CrearPedidoDetalle[];
}

export interface PedidoRelation extends AssignToRelationsDto {
  inicioPreparacion?: Date;
  finPreparacion?: Date;
  total: number;
  totalCosto: number;
  estado: EstadoPedidoEnum;
  tipoEnvio: TipoEnvioEnum;
  formaPago: FormaPagoEnum;
  isAnulado: boolean;
  mpPreferenceId: string;
  statusMP: StatusMPEnum;

  cliente?: PersonaClienteRelation;
  cajero?: PersonaEmpleadoRelation;
  cocinero?: PersonaEmpleadoRelation;
  delivery?: PersonaEmpleadoRelation;

  detalles: PedidoDetalleRelation[];
}