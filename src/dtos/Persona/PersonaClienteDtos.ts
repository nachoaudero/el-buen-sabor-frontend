import type {PersonaRelation, PersonaRequest, PersonaResponse} from "@dtos/Persona/PersonaDtos.ts";
import type {DomicilioRelation} from "@dtos/Persona/DomicilioDto.ts";

export interface PersonaClienteResponse extends PersonaResponse {
    dni: number;
    telefono: number;
    fechaNacimiento: Date;
    domicilio: DomicilioRelation;
}

export interface PersonaClienteRequest extends PersonaRequest {
    dni: number;
    telefono: number;
    fechaNacimiento: Date;
    domicilio: DomicilioRelation;
}

export interface PersonaClienteRelation extends PersonaRelation {
    dni: number;
    telefono: number;
    fechaNacimiento: Date;
    domicilio: DomicilioRelation;
}