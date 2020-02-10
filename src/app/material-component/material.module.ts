import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';



import { InicioComponent } from './inicio/inicio.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ClavesProfesoresComponent } from './claves-profesores/claves-profesores.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  
  declarations: [
    
    InicioComponent,
    ProfesoresComponent,
    ClavesProfesoresComponent
  ]
})
export class MaterialComponentsModule {}
