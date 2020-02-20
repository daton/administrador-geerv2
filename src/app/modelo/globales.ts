import { Alumno } from "./alumno";
import { Profesor } from "./profesor";
import { Perfil } from "./perfil";
import { Estatus } from "./estatus";
import { Ciclo } from "./ciclo";
import { Administrador } from "./administrador";
export class Globales {
  public static alumno: Alumno = {};

  public static alumnos: Alumno[];

  public static profesor: Profesor = {};
  public static administrador:Administrador={}

  public static urlBase:string="https://geradmin.herokuapp.com/api";
 //public static urlBase: string = "http://192.168.100.85:9000/api";
//public static urlBase: string = "http://localhost:9000/api";
  //TONTOTTTTTTTTTTT

  public static esProfesor: boolean;
  public static esAlumno: boolean;
  public static examenesMateriNombre: string;
  public static examenesNombre: string;

  public static estatus: Estatus;
  public static cargando: boolean;
  public static cicloA:number
  public static cicloB:number

  public static menus: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Examenes', url: '/dashboard' },
        { titulo: 'Andamios', url: '/progress' },
        { titulo: 'Videos', url: '/graficas1' },

      ]
    }
  ];

  
 
   //Arreglo de esamenes
public static inf_examenes:[
  [
    {id:'inf1-diagnostico', nombre:' Informática 1', bloque: 'diagnóstico'},
    {id:'inf1-b1',nombre:' Informática 1', bloque: 'bloque 1' },
    {id:'inf1-b2', nombre:' Informática 1', bloque: 'bloque 2' },
    {id:'inf1-b3', nombre:' Informática 1', bloque: 'bloque 3'},
 
   ],
   [
    {id:'inf2-diagnostico',nombre:' Informática 2', bloque: 'diagnóstico'},
    {id:'inf2-b1', nombre:' Informática 2', bloque: 'bloque 1'},
    {id:'inf2-b2', nombre:' Informática 2', bloque: 'bloque 2'},
    {id:'inf2-b3', nombre:' Informática 2', bloque: 'bloque 3'}
 
   ],
   [
    {id:'inf3-diagnostico',nombre:' Informática 3', bloque: 'diagnóstico'},
    {id:'inf3-b1', nombre:' Informática 3', bloque: 'bloque 1'},
    {id:'inf3-b2', nombre:' Informática 3', bloque: 'bloque 2'},
    {id:'inf3-b3',nombre:' Informática 3', bloque: 'bloque 3'},
   ],
   [
    {id:'inf4-diagnostico', nombre:' Informática 4', bloque: 'diagnóstico'},
   {id:'inf4-b1', nombre:' Informática 4', bloque: 'bloque 1'},
   {id:'inf4-b2', nombre:' Informática 4', bloque: 'bloque 2'},
   {id:'inf4-b3', nombre:' Informática 4', bloque: 'bloque 3'}
 
   ]
]
 
  
  


   //Arreglo  de de andamios ALUMNOS
   public static inf_andamios_alumnos:[
    [
      {nombre:'Informática 1',bloque: 'bloque 1', url:"https://geducativoedi.com.mx/inf1-b1-alumno.zip"},
      {nombre:'Informática 1',bloque: 'bloque 2', url:"https://geducativoedi.com.mx/inf1-b2-alumno.zip"},
      {nombre:'Informática 1',bloque: 'bloque 3', url:"https://geducativoedi.com.mx/inf1-b3-alumno.zip"}
     ],
     [
      {nombre:'Informática 2', bloque: 'bloque 1', url:"https://geducativoedi.com.mx/info2-bloque1-alumno.zip"},
      {nombre:'Informática 2', bloque: 'bloque 2', url:"https://geducativoedi.com.mx/info2-bloque2-alumno.zip"},
      {nombre:'Informática 2', bloque:'bloque 3', url:"https://geducativoedi.com.mx/info2-bloque3-alumno.zip"}
     ],
     [
      {nombre:'Informática 3', bloque:'bloque 1', url:"https://geducativoedi.com.mx/inf3-b1-alumno.zip"},
      {nombre:'Informática 3',  bloque: 'bloque 2', url:"https://geducativoedi.com.mx/inf3-b2-alumno.zip"},
      {nombre:'Informática 3', bloque: 'bloque 3', url:"https://geducativoedi.com.mx/inf3-b3-alumno.zip"}
     ],
     [
      {nombre:'Informática 4',  bloque: 'bloque 1', url:"https://geducativoedi.com.mx/info4-bloque1-alumno.zip"},
      {nombre:'Informática 4',  bloque: 'bloque 2', url:"https://geducativoedi.com.mx/info4-bloque2-alumno.zip"},
      {nombre:'Informática 4',  bloque: 'bloque 3', url:"https://geducativoedi.com.mx/info4-bloque3-alumno.zip"}
     ]
   
    
   ]


//Arreglo de andamios profesores
public static inf_andamios_profesores:[
  [
    {nombre:'Informática 1', bloque: 'bloque 1', url:"https://geducativoedi.com.mx/inf1-b1-profesor.zip"},
    {nombre:'Informática 1', bloque: 'bloque 2' , url:"https://geducativoedi.com.mx/inf1-b2-profesor.zip"},
    {nombre:'Informática 1', bloque: 'bloque 3', url:"https://geducativoedi.com.mx/inf1-b3-profesor.zip"}
   ],
   [
    {nombre:'Informática 2', bloque:'bloque 1', url:"https://geducativoedi.com.mx/info2-bloque1-profesor.zip"},
    {nombre:'Informática 2' ,bloque: 'bloque 2', url:"https://geducativoedi.com.mx/info2-bloque2-profesor.zip"},
    {nombre:'Informática 2' ,bloque: 'bloque 3', url:"https://geducativoedi.com.mx/info2-bloque3-profesor.zip"}
   ],
   [
    {nombre:'Informática 3', bloque:'bloque 1', url:"https://geducativoedi.com.mx/inf3-b1-profesor.zip"},
    {nombre:'Informática 3', bloque:'bloque 2', url:"https://geducativoedi.com.mx/inf3-b2-profesor.zip"},
    {nombre:'Informática 3', bloque:'bloque 3', url:"https://geducativoedi.com.mx/inf3-b3-profesor.zip"}
   ],
   [
    {nombre:'Informática 4', bloque:'bloque 1', url:"https://geducativoedi.com.mx/info4-bloque1-profesor.zip"},
    {nombre:'Informática 4', bloque: 'bloque 2', url:"https://geducativoedi.com.mx/info4-bloque2-profesor.zip"},
    {nombre:'Informática 4', bloque: 'bloque 3', url:"https://geducativoedi.com.mx/info4-bloque3-profesor.zip"}
   ]

]
    
  }


    
  

