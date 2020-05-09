import { Component, OnInit } from '@angular/core';
import { } from 'ngx-quill';
import Quill from 'quill'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../../modelo/pregunta';
import { Opcion } from '../../modelo/opcion';
import { Estatus } from '../../modelo/estatus';
import { Globales } from '../../modelo/globales';
import { ExamenLectura } from '../../modelo/examenlectura';
import { Conjunto } from '../../modelo/conjunto';

@Component({
  selector: 'app-genexam-lectura',
  templateUrl: './genexam-lectura.component.html',
  styleUrls: ['./genexam-lectura.component.css']
})
export class GenexamLecturaComponent implements OnInit {

  favoriteSeason: string;
  radios: any[] = [{ indice: 0, texto: 'Uno' }, { indice: 1, texto: 'Uno' }, { indice: 2, texto: 'Uno' }, { indice: 3, texto: 'Uno' }];
  indiceSeleccionado: number

  quill: Quill
  quillBuble: Quill
  content: any
  contenido: any
  editor: any
  vista: Quill
  focused = false
  blured = false

  indiceTab: number = 0
  selectedValue: string

  materias: string[] = ['Materia demo', 'Informática 2', 'Informática 4', 'Lenguajes y comunicación 1', 'Lenguajes y comunicación 2', 'Literatura 1', 'Literatura 2', 'Taller de análisis de textos 1', 'Taller de análisis de textos 2']
  materia: string


  bloqueExamen: any[] = [{ nombre: 'diagnostico', nombreLargo: 'Diagnóstico' }, { nombre: 'b1', nombreLargo: 'Bloque 1' }, { nombre: 'b2', nombreLargo: 'Bloque 2' }, { nombre: 'b3', nombreLargo: 'Bloque 3' }]
  bloque: any

  public form: FormGroup;
  //Numero de la pregunta
  numero = 0

  puedeGuardar: boolean = false
  estatus: Estatus = {}
  examenLectura: ExamenLectura = {}
  tituloLectura: string
  miContenido: string
  conjunto: Conjunto
  preguntaActual: Pregunta = {};
  opcionesActuales: Opcion[] = []
  preguntas:Pregunta[]=[]
  conjuntos:Conjunto[]=[]



  constructor(private fb: FormBuilder, private http: HttpClient) { }
  ngOnInit() {
    this.preguntaActual.opciones = this.opcionesActuales

    this.iniciarFormulario()
    // 
    // var recobrado = JSON.parse(jsonString);
    // this.quill=jsonString
    let jsonString = localStorage.getItem("contenido");

    this.contenido = JSON.parse(jsonString);
    console.log("Contenido" + jsonString)

    setTimeout(() => {
      let jsonString = localStorage.getItem("contenido");
      this.quill.content = JSON.parse(jsonString);
      this.content = JSON.parse(jsonString);
      console.log(JSON.stringify(this.quill.content))

    }, 1200)


  }
  creado(event: Quill) {
    // tslint:disable-next-line:no-console
    this.quill = event


    //let jsonString = localStorage.getItem("contenido");
    //event.content = JSON.parse(jsonString);

    //El contenido de el editor a JSON
    //this.content = JSON.parse(jsonString);

    event.setContents(this.content)
    console.log("INvocado al crearlo " + JSON.stringify(event.content))
    this.contenido = this.content
    this.editor = this.quill.content
    //event.enable(false);   


  }


  creado2(event: Quill) {
    // tslint:disable-next-line:no-console
    this.quillBuble = event

    console.log("Invocando el quill-view")
   // let jsonString = localStorage.getItem("contenido");
   // event.content = JSON.parse(jsonString);
    //this.content = JSON.parse(jsonString);

    event.setContents(this.content)
    event.enable(false);


  }

  oprimirBoton() {
    console.log("Al oprimir el boton" + JSON.stringify(this.quill.content))
    this.editor.text = "hola"
    this.contenido = this.quill.content
    this.quill.setContents(null)
  }

  cambiar(event: Quill) {
    console.log(" AGUARDARRRRRR11" + JSON.stringify(event.content))
    this.miContenido = JSON.stringify(event.content)

   // localStorage.setItem("contenido", JSON.stringify(event.content))


  }


  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }


  iniciarFormulario() {

    this.numero++;
    this.form = this.fb.group({

      selectedValue: [
        null,
        Validators.compose([Validators.required])
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

  finalizar() {

  }
  actualizarReactivo() {

  }

  onTabChanged($event) {
    let clickedIndex = $event.index;
    //Cambiamos al idncieTab al actual esto para recetearlo.
    this.indiceTab = clickedIndex
    console.log("cambio" + clickedIndex);
    if (clickedIndex == 0) {


    }

  }
  guardarPregunta() {
    
   

    // console.log(contenido)
    let tituloPregunta = this.form.get('titulo').value
    console.log(tituloPregunta)
    let op1 = this.form.get('opcion1').value
    console.log(op1)
    let op2 = this.form.get('opcion2').value
    console.log(op2)
    let op3 = this.form.get('opcion3').value
    console.log(op3)
    let op4 = this.form.get('opcion4').value
    console.log(op4);
    console.log(this.indiceSeleccionado);

    //creamos opciones de la pregunta
    this.opcionesActuales=[
      {titulo:op1, acierto:false},
      {titulo:op2, acierto:false},
      {titulo:op3, acierto:false},
      {titulo:op4, acierto:false}
    ]

    //Ajustamos el valor de la opción valida
    this.opcionesActuales[this.indiceSeleccionado].acierto=true

    //creamos la pregunta
  this.preguntaActual={
  titulo:tituloPregunta,
  opciones:this.opcionesActuales
  }

  //Agregamos a las preguntas
  this.preguntas.push(this.preguntaActual)


   

    //Activamos el boton de guardarExamen
    this.puedeGuardar=true

  }
  guardarExamenLectura() {

 //preparamos el conjunto
this.conjunto={}
 console.log("El puto conteniudo "+this.miContenido)
 let elcontenido=this.miContenido

 this.conjunto={
  titulo:this.tituloLectura,
  textoGeneral:elcontenido,
   preguntas:this.preguntas
  
}
//agregamos a los Conjuntos pero antes lo vaciamos
this.conjuntos=[]
this.conjuntos.push(this.conjunto)


 // Finalmente Preparamos el examen
let materia=this.materia
//console.log(materia)
let bloque=this.bloque.nombre
//console.log(bloque)

//console.log(titulo)

this.examenLectura={}
 this.examenLectura={
   id:materia+"-"+bloque,
   nombre:materia,
   conjuntos:this.conjuntos

 }

    this.http.post<Estatus>(Globales.urlBase + "/examen-lectura", this.examenLectura).subscribe(
      estatus => {
        console.log("SE ha enbviado con exito")
        this.estatus = estatus;
  

//Ni modo borramos las preguntas y los conjuntos
this.preguntas=[]
this.conjuntos=[]

      }
    )
    //
  }
}
