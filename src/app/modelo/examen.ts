import {Materia} from './materia';
import { Pregunta } from './pregunta';
export interface Examen {
    materia?:Materia
    bloque?:string
    nombre?:string
    calificacion?:number;
    realizado?:boolean
    activado?:boolean
    preguntas?:Pregunta[]
}
