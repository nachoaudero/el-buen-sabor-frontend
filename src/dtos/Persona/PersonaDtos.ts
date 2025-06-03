import type {AssignToRelationsDto, RequestDTO, ResponseDto,} from "@dtos/BaseDtos";
import {Rol} from "@dtos/Persona/Enums.ts";

export interface PersonaResponse extends ResponseDto {
    nombre: string;
    apellido: string;
    email: string;
    auth2Id: string;
    rol: Rol;
}

export interface PersonaRequest extends RequestDTO {
    nombre: string;
    apellido: string;
    email: string;
    auth2Id: string;
    rol: Rol;
}

export interface PersonaRelation extends AssignToRelationsDto {
    nombre: string;
    apellido: string;
    email: string;
    auth2Id: string;
    rol: Rol;
}
