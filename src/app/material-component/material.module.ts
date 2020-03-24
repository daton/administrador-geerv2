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
import { ClavesAlumnosComponent } from './claves-alumnos/claves-alumnos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { RespaldoBaseComponent } from './respaldo-base/respaldo-base.component';
import { GeneracionCodigosComponent } from './generacion-codigos/generacion-codigos.component';
import { GeneracionExamenesComponent } from './generacion-examenes/generacion-examenes.component';
import { CargarVideosComponent } from './cargar-videos/cargar-videos.component';
import { CargarAndamiosComponent } from './cargar-andamios/cargar-andamios.component';
import { MensajeriaComponent } from './mensajeria/mensajeria.component';
import { AlumnosTotalesComponent } from './alumnos-totales/alumnos-totales.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    FlexLayoutModule,
    AngularFileUploaderModule,
    CdkTableModule
  ],
  providers: [],
  
  declarations: [
    
    InicioComponent,
    ProfesoresComponent,
    ClavesProfesoresComponent,
    ClavesAlumnosComponent,
    AlumnosComponent,
    RespaldoBaseComponent,
    GeneracionCodigosComponent,
    GeneracionExamenesComponent,
    CargarVideosComponent,
    CargarAndamiosComponent,
    MensajeriaComponent,
    AlumnosTotalesComponent
  ]
})
export class MaterialComponentsModule {}
