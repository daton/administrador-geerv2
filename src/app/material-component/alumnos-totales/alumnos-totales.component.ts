import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../../modelo/globales';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Profesor } from '../../modelo/profesor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Materia } from '../../modelo/materia';
import { Estatus } from '../../modelo/estatus';

import { CustomValidators } from 'ng2-validation';

import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Alumno } from '../../modelo/alumno';

@Component({
  selector: 'app-alumnos-totales',
  templateUrl: './alumnos-totales.component.html',
  styleUrls: ['./alumnos-totales.component.css']
})
export class AlumnosTotalesComponent implements OnInit {


  miClaveAlumno: string
  public form: FormGroup;
  cargandoAlumnos:boolean
  cargando:boolean
  //Campos del listado

  //Ojito
  hide = true;
  estatus: Estatus = {}
  alumno: Alumno = {}

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Alumno>

  displayedColumns = ['clave','claveProfesor', 'nombre', 'usuario', 'password', 'fecha'];

  alumnos: Alumno[] = []


  miClaveLibro: string
  alumnosRegistrados: string

  listaGrupos: string[] = [];
  listaPlanteles: number[] = [
    1,
    2,
    3,
    4,
    5,
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20


  ];
  listaTurnos: string[] = [
    'Matutino',
    'Vespertino',
    'Mixto'
  ];




  constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver) {


    //El siguiente breakpoint es para hacer responsiva cada fila
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['clave','claveProfesor', 'nombre', 'usuario', 'password', 'fecha'] :
        ['clave','claveProfesor', 'nombre', 'usuario', 'password', 'fecha'];
    });


  }

  ngOnInit() {
this.cargandoAlumnos=false;
this.cargando=false
    //ControladorAlumno

    this.http.get<Alumno[]>(Globales.urlBase + "/alumno").subscribe(
      profesores => {
        this.alumnos = profesores;
        this.dataSource = new MatTableDataSource(this.alumnos);

        //this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1200)

      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;




  }

  cargarAlumnos(){
    this.cargando=true
    this.http.get<Alumno[]>(Globales.urlBase + "/alumno").subscribe(
      profesores => {
        this.alumnos = profesores;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.cargandoAlumnos=true
        this.cargando=false

        //this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1200)

      })
  }

  

}
