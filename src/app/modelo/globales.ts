import { Alumno } from "./alumno";
import { Profesor } from "./profesor";
import { Perfil } from "./perfil";
import { Estatus } from "./estatus";
export class Globales {
  public static alumno: Alumno = {};

  public static alumnos: Alumno[];

  public static profesor: Profesor = {};

//public static urlBase:string="https://geradmin.herokuapp.com/api";
 //public static urlBase: string = "http://192.168.100.7:9000/api";
public static urlBase: string = "http://localhost:9000/api";
  //TONTOTTTTTTTTTTT

  public static esProfesor: boolean;
  public static esAlumno: boolean;
  public static examenesMateriNombre: string;
  public static examenesNombre: string;

  public static estatus: Estatus;
  public static cargando: boolean;

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

  public static inf1_examenes:any=[
   {id:'inf1-diagnostico', nombre:' Inf 1, Diagnóstico'},
   {id:'inf1-b1', nombre:'Info 1, Bloque 1'},
   {id:'inf1-b2', nombre:'Info 1, Bloque 2' },
   {id:'inf1-b3', nombre: 'Info 1, Bloque 3'},

  ]

  public static inf2_examenes:any=[
    {id:'inf2-diagnostico', nombre:'Diagnóstico'},
    {id:'inf2-b1', nombre:'Info 2, Bloque 1'},
    {id:'inf2-b2', nombre:'Info 2, Bloque 2'},
    {id:'inf2-b3', nombre:'Info 2, Bloque 3'}
 
   ]

   public static inf4_examenes:any=[
    {id:'inf4-diagnostico', nombre:'Diagnóstico'},
   {id:'inf4-b1', nombre:'Info 4, Bloque 1'},
   {id:'inf4-b2', nombre:'Info 4, Bloque 2'},
   {id:'inf4-b3', nombre:'Info 4, Bloque 3'}
 
   ]
  public static inf3_examenes:any=[
    {id:'inf3-diagnostico', nombre:'Inf 3 Diagnóstico'},
    {id:'inf3-b1', nombre:'Info 3, Bloque 1'},
    {id:'inf3-b2', nombre:'Info 3, Bloque 2'},
    {id:'inf3-b3', nombre:'Info 3, Bloque 3'},
   ]
 
   public static inf3_andamios_alumnos:any=[
    {nombre:'Informática 3 bloque 1', url:"https://geducativoedi.com.mx/inf3-b1-alumno.zip"},
    {nombre:'Informática 3 bloque 2', url:"https://geducativoedi.com.mx/inf3-b2-alumno.zip"},
    {nombre:'Informática 3 bloque 3', url:"https://geducativoedi.com.mx/inf3-b3-alumno.zip"}
   ]

 
   public static inf1_andamios_alumnos:any=[
    {nombre:'Informática 1 bloque 1', url:"https://geducativoedi.com.mx/inf1-b1-alumno.zip"},
    {nombre:'Informática 1 bloque 2', url:"https://geducativoedi.com.mx/inf1-b2-alumno.zip"},
    {nombre:'Informática 1 bloque 3', url:"https://geducativoedi.com.mx/inf1-b3-alumno.zip"}
   ]

   public static inf2_andamios_alumnos:any=[
    {nombre:'Informática 2 bloque 1', url:"https://geducativoedi.com.mx/info2-bloque1-alumno.zip"},
    {nombre:'Informática 2 bloque 2', url:"https://geducativoedi.com.mx/info2-bloque2-alumno.zip"},
    {nombre:'Informática 2 bloque 3', url:"https://geducativoedi.com.mx/info2-bloque3-alumno.zip"}
   ]

   public static inf4_andamios_alumnos:any=[
    {nombre:'Informática 4 bloque 1', url:"https://geducativoedi.com.mx/info4-bloque1-alumno.zip"},
    {nombre:'Informática 4 bloque 2', url:"https://geducativoedi.com.mx/info4-bloque2-alumno.zip"},
    {nombre:'Informática 4 bloque 3', url:"https://geducativoedi.com.mx/info4-bloque3-alumno.zip"}
   ]

   public static inf1_andamios_profesores:any=[
    {nombre:'Informática 1 bloque 1', url:"https://geducativoedi.com.mx/inf1-b1-profesor.zip"},
    {nombre:'Informática 1 bloque 2', url:"https://geducativoedi.com.mx/inf1-b2-profesor.zip"},
    {nombre:'Informática 1 bloque 3', url:"https://geducativoedi.com.mx/inf1-b3-profesor.zip"}
   ]

   public static inf2_andamios_profesores:any=[
    {nombre:'Informática 2 bloque 1', url:"https://geducativoedi.com.mx/info2-bloque1-profesor.zip"},
    {nombre:'Informática 2 bloque 2', url:"https://geducativoedi.com.mx/info2-bloque2-profesor.zip"},
    {nombre:'Informática 2 bloque 3', url:"https://geducativoedi.com.mx/info2-bloque3-profesor.zip"}
   ]
   public static inf3_andamios_profesores:any=[
    {nombre:'Informática 3 bloque 1', url:"https://geducativoedi.com.mx/inf3-b1-profesor.zip"},
    {nombre:'Informática 3 bloque 2', url:"https://geducativoedi.com.mx/inf3-b2-profesor.zip"},
    {nombre:'Informática 3 bloque 3', url:"https://geducativoedi.com.mx/inf3-b3-profesor.zip"}
   ]
   public static inf4_andamios_profesores:any=[
    {nombre:'Informática 4 bloque 1', url:"https://geducativoedi.com.mx/info4-bloque1-profesor.zip"},
    {nombre:'Informática 4 bloque 2', url:"https://geducativoedi.com.mx/info4-bloque2-profesor.zip"},
    {nombre:'Informática 4 bloque 3', url:"https://geducativoedi.com.mx/info4-bloque3-profesor.zip"}
   ]


    
  }

