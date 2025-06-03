import type {PersonaRelation, PersonaRequest, PersonaResponse} from "@dtos/Persona/PersonaDtos.ts";
import type {Puesto} from "@dtos/Persona/Enums.ts";

export interface PersonaEmpleadoResponse extends PersonaResponse {
    puesto: Puesto;
}

export interface PersonaEmpleadoRequest extends PersonaRequest {
    puesto: Puesto;
}

export interface PersonaEmpleadoRelation extends PersonaRelation {
    puesto: Puesto;
}