import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full'
      },
      {
        path: 'dashboards',
        loadChildren: './dashboards/dashboards.module#DashboardsModule'
      },
      {
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      }
      
    ]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];
