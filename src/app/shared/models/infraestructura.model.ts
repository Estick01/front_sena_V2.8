import { AreaModel } from "./area.model";
import { SedeModel } from "./sede.model";

export interface InfraestructuraModel{
    id?:number;
    nombreInfraestructura:string;
    capacidad:number;
    codigoQr?:string;
    descripcion?:string;

    idSede?:number;
    idArea?:number;

    sede?:SedeModel;
    area?:AreaModel;

    newQr?:string;
}