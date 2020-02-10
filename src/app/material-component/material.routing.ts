import { Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ClavesProfesoresComponent } from './claves-profesores/claves-profesores.component';

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
      
    ]
  }
];
