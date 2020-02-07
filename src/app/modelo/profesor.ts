import { Sistema } from "./sistema";
import { Materia } from "./materia";
import { Examen } from "./examen";

export interface Profesor {
  clave?: string;
  usuario?:string
  nombre?: string;
  paterno?: string;
  materno?: string;
  celular?: string;
  telefono?:string;
  plantel?:string;
  planteles?:string[]
  turno?: string;
  password?: string;
  email?: string;
fecha?:string
hora?:string
  registrado?: string;
  area?:string
  materias?: Materia[];
  sistema?: Sistema;
  examen?:Examen
}
