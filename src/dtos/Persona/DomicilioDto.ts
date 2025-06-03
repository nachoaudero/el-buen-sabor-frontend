import type {AssignToRelationsDto} from "@dtos/BaseDtos.ts";

export interface DomicilioRelation extends AssignToRelationsDto {
    calle: string;
    numero: number;
    cp: number;
}