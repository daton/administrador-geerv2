import {Perfil} from './perfil'
import { Profesor } from './profesor';
import { Alumno } from './alumno';
import { Examen } from './examen';
export class Estatus {
success?:boolean;
mensaje?:string;
   perfil?:Perfil
   profesor?:Profesor
   alumno?:Alumno
   examen?:Examen
}
