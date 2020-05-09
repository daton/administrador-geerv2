import { Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ClavesProfesoresComponent } from './claves-profesores/claves-profesores.component';
import { ClavesAlumnosComponent } from './claves-alumnos/claves-alumnos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { RespaldoBaseComponent } from './respaldo-base/respaldo-base.component';
import { GeneracionCodigosComponent } from './generacion-codigos/generacion-codigos.component';
import { GeneracionExamenesComponent } from './generacion-examenes/generacion-examenes.component';
import { CargarVideosComponent } from './cargar-videos/cargar-videos.component';
import { CargarAndamiosComponent } from './cargar-andamios/cargar-andamios.component';
import { MensajeriaComponent } from './mensajeria/mensajeria.component';
import { AlumnosTotalesComponent } from './alumnos-totales/alumnos-totales.component';
import { GenexamLecturaComponent } from './genexam-lectura/genexam-lectura.component';

export const MaterialRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
      
        path: 'inicio',
        component: InicioComponent,
        data: {
          title: 'Inicio',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Inicio' }
          ]
        }
      },
      {
        path: 'mensajeria',
        component: MensajeriaComponent,
        data: {
          title: 'Mensajería',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Mensajería' }
          ]
        }
      },
      {
        path: 'profesores',
        component: ProfesoresComponent,
        data: {
          title: 'Profesores',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Profesores' }
          ]
        }
      },
      {
        path: 'alumnos-totales',
        component: AlumnosTotalesComponent,
        data: {
          title: 'Alumnos totales',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Alumnos totales' }
          ]
        }
      },
      {
        path: 'claves-profesores',
        component: ClavesProfesoresComponent,
        data: {
          title: 'Claves de profesores',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Claves de profesores' }
          ]
        }

      },
      {
        path: 'claves-alumnos',
        component: ClavesAlumnosComponent,
        data: {
          title: 'Claves de alumnos',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Claves de alumnos' }
          ]
        }
      },
      {
        path: 'alumnos',
        component: AlumnosComponent,
        data: {
          title: 'Datos de alumnos',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Datos de alumnos' }
          ]
        }
      },
      {
        path: 'respaldo-base',
        component: RespaldoBaseComponent,
        data: {
          title: 'Respalo de B.D.',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Respaldo de B.D.' }
          ]
        }
      },
      {
        path: 'generacion-codigos',
        component: GeneracionCodigosComponent,
        data: {
          title: 'Generación de códigos',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Generación de códigos' }
          ]
        }
      },
      {
        path: 'generacion-examenes',
        component: GeneracionExamenesComponent,
        data: {
          title: 'Examenes de opciones',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Examenes de opciones' }
          ]
        }
      },
      {
        path: 'genexam-lectura',
        component: GenexamLecturaComponent,
        data: {
          title: 'Examenes de  lecturas',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Examenes de lecturas' }
          ]
        }
      },
      {
        path: 'cargar-videos',
        component: CargarVideosComponent,
        data: {
          title: 'Cargar videos',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Cargar videos' }
          ]
        }
      },
      {
        path: 'cargar-andamios',
        component: CargarAndamiosComponent,
        data: {
          title: 'Cargar andamios',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Cargar andamios' }
          ]
        }
      }
      
    ]
  }
];
