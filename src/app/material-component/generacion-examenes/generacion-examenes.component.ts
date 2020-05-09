

import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesor } from '../../modelo/profesor';
import { Globales } from '../../modelo/globales';
import { Materia } from '../../modelo/materia';
import { Examen } from '../../modelo/examen';
import { Pregunta } from '../../modelo/pregunta';

import { HttpClient } from '@angular/common/http';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Estatus } from '../../modelo/estatus';
import Swal from 'sweetalert2';
import { Alumno } from '../../modelo/alumno';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CustomValidators } from 'ng2-validation';
import { Opcion } from '../../modelo/opcion';

@Component({
  selector: 'app-generacion-examenes',
  templateUrl: './generacion-examenes.component.html',
  styleUrls: ['./generacion-examenes.component.css']
})
export class GeneracionExamenesComponent implements OnInit {

  mitipo:any={}

  materias: string[] = ['Materia demo','Informática 2', 'Informática 4','Lenguajes y comunicación 1','Lenguajes y comunicación 2', 'Literatura 1','Literatura 2','Taller de análisis de textos 1', 'Taller de análisis de textos 2']
  materia: string
  indiceTab = 0;
  agregado: boolean
  mostrarPreguntas: boolean

  cargando: boolean
  miClave = false
  selected: string
  selectedValue: string;
  paraActualizar:boolean;

  preguntaActual: Pregunta;
  opcionesActuales: Opcion[]


  estatus: Estatus = {}
  //Ojito
  hide = true;
  id: string

  bloqueExamen: any[] = [{nombre: 'diagnostico', nombreLargo: 'Diagnóstico' },{ nombre: 'b1', nombreLargo: 'Bloque 1' }, { nombre: 'b2', nombreLargo: 'Bloque 2' }, { nombre: 'b3', nombreLargo: 'Bloque 3' }]
  bloque: string
  examen: Examen = {}
  mostrarFormulario: boolean
  mostrarSeleccionarMateria: boolean


  public form: FormGroup;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Pregunta>





  preguntas: Pregunta[] = []

  searchText: any;
  displayedColumns: string[] = ['numero', 'titulo'];


  constructor(private fb: FormBuilder, private http: HttpClient, private breakpointObserver: BreakpointObserver) {

    //El siguiente breakpoint es para hacer responsiva cada fila
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['numero', 'titulo'] :
        ['numero', 'titulo'];
    });
  }


  ngOnInit() {
//Reiniciamos los reactrivos, para la vez que los examenes no tienen ningun reactivo
this.examen={}
this.preguntas=[]
this.examen.preguntas=this.preguntas


    this.mostrarSeleccionarMateria = true
    this.mostrarPreguntas = false
    this.mostrarFormulario = false
    this.iniciarFormulario()


  }

  cargarReactivos(materia: string, bloque: any) {

this.mostrarSeleccionarMateria=false

    console.log("Son " + materia + "-" + bloque.nombre)
    this.id = materia + "-" + bloque.nombre
    this.http.get<Examen>(Globales.urlBase + '/examen-profesor/' + this.id).subscribe(
      examen => {
        this.examen = examen;
        //Checamos si el examen ya existe, si no existe lo iniciamos para que no quede en null
        //al igual que sus preguntas
        if(this.examen.preguntas.length!=0){
          this.preguntas = this.examen.preguntas
          console.log("SI HAY PREGUNTAS "+this.preguntas.length)
        }else{
          this.examen={}
          this.preguntas=[]
          this.examen.preguntas=this.preguntas
          console.log("No hay preguntas "+this.preguntas.length);
        }
        




        //let indice = 1


        this.dataSource = new MatTableDataSource(this.preguntas);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1200)


        //Mostramos la tabla
        this.mostrarPreguntas = true
        this.mostrarSeleccionarMateria = false;
        console.log(JSON.stringify('malaaaaaa' + JSON.stringify(this.preguntas)));
      }
    )

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }
  modificar(numero: number) {
  this.paraActualizar=true
    this.mostrarFormulario = true;


    this.preguntaActual = this.preguntas.find(obj => obj.numero == numero)
    console.log("Modificaras esta pregunta" + JSON.stringify(this.preguntaActual));
    this.preguntaActual.opciones.forEach(opcion => {
      if (opcion.acierto) {
        this.selectedValue = opcion.titulo
        console.log("POuto " + this.selectedValue)
      }
    })
    this.indiceTab = 1




  }

  actualizarReactivo() {
   
    console.log("El valor seleccionado econ formulario  " + this.form.get('selectedValue').value)
    let indice = this.form.get('selectedValue').value

    console.log("El valor seleccionado con selectedvalue  " + this.selectedValue)
    //Ajustamos la correcta si es o no que cambió
    this.preguntaActual.opciones.forEach((opcion, i) => {
      if (opcion.titulo == this.selectedValue) {
        opcion.acierto = true
      } else {
        opcion.acierto = false
      }
    })
    console.log("El id a enviar es " + this.id);
    console.log("La pregunta a esviar es " + JSON.stringify(this.preguntaActual));

//para actualizar
    if(this.paraActualizar){
      console.log("PARA ACTUALIZAR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")

    this.http.put<Estatus>(Globales.urlBase + "/examen-profesor/reactivo/" + this.id, this.preguntaActual).subscribe(
      estatus => {
        this.estatus = estatus;
        console.log("El estatus del reactivo es" + this.estatus.mensaje);


        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: this.estatus.mensaje,
        })
        // this.obtenerPreguntas();
   } )
   //PARA GUARDAR UNO REACTIVO NUEVO
   //Controlador 
  }else{
    console.log("PARA GAURDAR NUEVO")
    this.http.post<Estatus>(Globales.urlBase + "/examen-profesor/reactivo/" + this.id, this.preguntaActual).subscribe(
      estatus => {
        this.estatus = estatus;
        console.log("El estatus del reactivo es" + this.estatus.mensaje);


        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: this.estatus.mensaje,
        })
        // this.obtenerPreguntas();
   } )
  }
    //Limpiamos la pregunta actual



  }
  //Metodo para inicia el formulario
  iniciarFormulario() {
    this.form = this.fb.group({

      selectedValue: [



      ],
      numero: [
        null,
        Validators.compose([
          Validators.required, /*CustomValidators.equal("123")*/

        ])
      ],
      titulo: [
        null,
        Validators.compose([Validators.required])
      ]
      ,
      opcion1: [
        null,
        Validators.compose([Validators.required /*CustomValidators.url*/])
      ],
      opcion2: [
        null,
        Validators.compose([Validators.required])
      ],
      opcion3: [
        null,
        Validators.compose([Validators.required])
      ],
      opcion4: [
        null,
        Validators.compose([Validators.required])
      ]
    });
    //Inicializamos a los profesores
  }


  onTabChanged($event) {
    let clickedIndex = $event.index;
    //Cambiamos al idncieTab al actual esto para recetearlo.
    this.indiceTab = clickedIndex
    console.log("cambio" + clickedIndex);
    if (clickedIndex == 0) {

      this.obtenerPreguntas()
    }

  }


  //Para agregar un nuevo profesor
  agregar() {
    //Visualizamos el formulario

    this.agregado = true
  }
  obtenerPreguntas() {


    this.http.get<Examen>(Globales.urlBase + '/examen-profesor/' + this.id).subscribe(
      examen => {
        this.examen = examen;
        this.preguntas = this.examen.preguntas
        this.dataSource = new MatTableDataSource(this.preguntas)
        console.log(this.examen.preguntas.length);


        //Iniciamos despues el formulario
        //this.iniciarFormulario()

        //Mostramos la tabla
        this.mostrarPreguntas = true
      }
    )
  }
  guardarProfesor() {

    //  console.log("Profesor a guardar es " + JSON.stringify(this.profesor));

    // this.http.put<Estatus>(Globales.urlBase + '/profesor', this.profesor).subscribe(
    // estatus => {
    //  this.estatus = estatus
    //this.profesor = this.estatus.profesor

    Swal.fire({
      icon: 'success',
      title: 'Actualizado',
      text: this.estatus.mensaje,
    })
    // })


    //Para que se refresquen los alumnos ya con el guardaro
    this.obtenerPreguntas()

  }

  borrarAlumno(email: string) {
    console.log("Se borrara" + email)

    this.obtenerPreguntas()
  }

  irAMostrarMateria() {
    this.mostrarSeleccionarMateria = true
    this.mostrarPreguntas = false
    this.mostrarFormulario = false
  }

  nuevoReactivo() {

    this.paraActualizar=false;
    this.preguntaActual = {}
    this.preguntaActual.numero=this.examen.preguntas.length+1
let opciones:Opcion[]=[{titulo:'',acierto:false},{titulo:'',acierto:false},{titulo:'',acierto:false},{titulo:'',acierto:false}]
this.preguntaActual.opciones=opciones
this.preguntaActual.titulo=null
    this.mostrarFormulario = true;



    this.indiceTab = 1


  }

}
