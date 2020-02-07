import { Examen } from "./examen";

export interface Materia {
  campo?:string
  nombre?:string
  grupos?:string[]
  examen?:Examen
}
