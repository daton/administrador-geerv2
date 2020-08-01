import { Injectable } from '@angular/core';
import { Globales } from '../../modelo/globales';
import { Administrador } from '../../modelo/administrador';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  
  {
    state: 'material',
    name: 'Administración',
    type: 'sub',
    icon: 'account_balance',
    badge: [{ type: 'blue', value: '11' }],
    children: [
 
      {state:'inicio', name:'Inicio', type:'link'},
      {state:'mensajeria', name:'Mensajeria', type:'link'},
      {state:'alumnos-totales',name:'Alumnos totales', type:'link'},
      {state:'profesores', name:'Profesores', type:'link'},
      {state:'claves-profesores', name:'Claves de profesores', type:'link'},
      {state:'claves-alumnos', name:'Clave de alumnos', type:'link'},
      {state:'alumnos', name:'Datos de alumnos', type:'link'},
      {state:'respaldo-base', name:'Respaldo de BD', type:'link'},
      {state:'generacion-codigos', name:'Generación de códigos', type:'link'},
      {state:'generaexam-opciones', name:'*Examenes opciones', type:'link'},
     // {state:'generacion-examenes', name:'Examenes de opciones', type:'link'},
      {state:'genexam-lectura', name:'Examenes de lecturas', type:'link'},
      {state:'cargar-videos', name:'Cargar videos', type:'link'},
      {state:'cargar-andamios', name:'Cargar andamios', type:'link'}

 
    ]
  },
  
];

const MENUITEMS1 = [
  
  {
    state: 'material',
    name: 'Administración',
    type: 'sub',
    icon: 'account_balance',
    badge: [{ type: 'blue', value: '6' }],
    children: [
 
      {state:'inicio', name:'Inicio', type:'link'},
      {state:'profesores', name:'Profesores', type:'link'},
      {state:'claves-profesores', name:'Claves de profesores', type:'link'},
      {state:'alumnos', name:'Datos de alumnos', type:'link'},
      {state:'cargar-videos', name:'Cargar videos', type:'link'},
      {state:'cargar-andamios', name:'Cargar andamios', type:'link'}

    ]
  },
  
];

const MENUITEMS2 = [
  
  {
    state: 'material',
    name: 'Administración',
    type: 'sub',
    icon: 'account_balance',
    badge: [{ type: 'blue', value: '4' }],
    children: [
 
      {state:'inicio', name:'Inicio', type:'link'},
      {state:'claves-profesores', name:'Claves de profesores', type:'link'},
      {state:'cargar-videos', name:'Cargar videos', type:'link'},
      {state:'cargar-andamios', name:'Cargar andamios', type:'link'}
   
  
    ]
  }
 
];

@Injectable()
export class MenuItems {


  getMenuitem(): Menu[] {
let administrador:Administrador={}
      administrador = JSON.parse(localStorage.getItem('miAdministrador'));
    if(administrador.usuario=='admin'){
     // console.log("Accedemos a administrador");
      return MENUITEMS;
    }
    if(administrador.usuario=='supervisor1'){

   //   console.log("Se acaba de activar este supervisor 1")
      return MENUITEMS1;
    }
    if(administrador.usuario=='supervisor2'){
     console.log("SE acaba de acceder al supervisor 2")
      return MENUITEMS2;
    }
   
  }
}
