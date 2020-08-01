import {Opcion} from './opcion'

export interface Pregunta {
    numero?:number
    opciones?:Opcion[]
    titulo?:string
    tituloTexto?:string

}
