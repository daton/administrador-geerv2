import { Pregunta } from "./pregunta";

export class ExamenOpciones {
    id?:string

    materia?:string
    claveProfesor?:string
    nombre?:string
    activado ?:boolean
    preguntas?:Pregunta[]
    fecha?: string
}