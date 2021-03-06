import { Component, OnInit, ViewChild } from '@angular/core';
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
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSort, MatPaginator, MatTableDataSource, MatRadioButton } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genexam-lectura',
  templateUrl: './genexam-lectura.component.html',
  styleUrls: ['./genexam-lectura.component.css']
})
export class GenexamLecturaComponent implements OnInit {



  favoriteSeason: string;
  radios: any[] = [{ indice: 0, texto: 'Uno' }, { indice: 1, texto: 'Dos' }, { indice: 2, texto: 'Tres' }, { indice: 3, texto: 'Cuatro' }];
  indiceSeleccionado: number

  //El siguiente arreglo es para modificar en el SElect texto o preguntas, o agregar nueva pregunta
  seleccionModificar = ['Modificar Lectura', 'Modificar Pregunta', 'Agregar Pregunta']
  miOpcionModificacion: string


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Conjunto>


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

  materias: string[] = ['Materia demo',
    'Informática 2', 'Informática 4', 'Lenguajes y comunicación 1', 'Lenguajes y comunicación 2',
    'Literatura 1', 'Literatura 2', 'Taller de análisis de textos 1',
    'Taller de análisis de textos 2']
  materia: string

  idValido = false;
  bloqueExamen: any[] = [{ nombre: 'diagnostico', nombreLargo: 'Diagnóstico' }, { nombre: 'b1', nombreLargo: 'Bloque 1' }, { nombre: 'b2', nombreLargo: 'Bloque 2' }, { nombre: 'b3', nombreLargo: 'Bloque 3' }]
  bloque: any

  //Menu de preguntas para modificar una pregunta
  menuPreguntas:Pregunta[]=[]

  public form: FormGroup;
  //Numero de la pregunta
  numero = 0

  puedeGuardar: boolean = false
  estatus: Estatus = {}
  examenLectura: ExamenLectura = {}
  tituloLectura: string
  miContenido: string
  conjunto: Conjunto
  indiceConjunto: number
  preguntaActual: Pregunta = {};
  opcionesActuales: Opcion[] = []
  preguntas: Pregunta[] = []
  conjuntos: Conjunto[] = []
  idExamen: string
  indicePregunta:number


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


    //this.preguntaActual.opciones = this.opcionesActuales

    this.iniciarFormulario()
    // 
    // var recobrado = JSON.parse(jsonString);
    // this.quill=jsonString
    let jsonString = localStorage.getItem("contenido");

    this.contenido = JSON.parse(jsonString);
    console.log("Contenido" + jsonString)
    /*
        setTimeout(() => {
          let jsonString = localStorage.getItem("contenido");
          this.quill.content = JSON.parse(jsonString);
          this.content = JSON.parse(jsonString);
          console.log(JSON.stringify(this.quill.content))
    
        }, 1200)
    */

  }


  cargarReactivos(materia: string, bloque: any) {

   
    //Inicamos todos
    this.preguntas=[]
    console.log("Preguntas en el poool "+this.preguntas.length)
    this.preguntaActual={}
    this.indiceTab = 0
    this.materia = materia
    this.bloque.nombre = bloque.nombre

    console.log("Son " + materia + "-" + bloque.nombre)
    this.idExamen = materia + "-" + bloque.nombre
    this.http.get<ExamenLectura>(Globales.urlBase + '/examen-lectura/' + this.idExamen).subscribe(
      examen => {
        this.examenLectura = examen;
        //Checamos si el examen ya existe, si no existe lo iniciamos para que no quede en null
        //al igual que sus preguntas
        if (this.examenLectura.conjuntos != null) {
          this.conjuntos = this.examenLectura.conjuntos
          console.log("SI conjuntos" + this.conjuntos.length)
          this.idValido = true
        } else {

          this.conjuntos = []
          console.log("No hay conjuntos " + this.conjuntos.length);
          this.idValido = true
        }





        //let indice = 1


        this.dataSource = new MatTableDataSource(this.conjuntos);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1200)


        //Mostramos la tabla

      }
    )

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

  creadoModificar(event: Quill) {
    // tslint:disable-next-line:no-console
    this.quill = event


    //let jsonString = localStorage.getItem("contenido");
    //event.content = JSON.parse(jsonString);

    //El contenido de el editor a JSON
    //this.content = JSON.parse(jsonString);
    this.conjunto.textoGeneral

    event.setContents(JSON.parse(this.conjunto.textoGeneral))
    console.log("INvocado al crearlo modificarlo")
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
    if(clickedIndex==1){
      //Este es muy importante, si no inicias a las preguntas en cero  se van a acmumular en las siguientes lecturs
      this.conjunto={}
      this.preguntas=[]
      console.log("Nueva lectura pregs "+this.preguntas.length)

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
    this.opcionesActuales = [
      { titulo: op1, acierto: false },
      { titulo: op2, acierto: false },
      { titulo: op3, acierto: false },
      { titulo: op4, acierto: false }
    ]

    //Ajustamos el valor de la opción valida
    this.opcionesActuales[this.indiceSeleccionado].acierto = true

    //creamos la pregunta
    this.preguntaActual = {
      titulo: tituloPregunta,
      opciones: this.opcionesActuales
    }

    //Agregamos a las preguntas
    this.preguntas.push(this.preguntaActual)




    //Activamos el boton de guardarExamen
    this.puedeGuardar = true

    // Limpiamos el formulario
    this.form.reset();

  }
  guardarExamenLectura() {






    Swal.fire({
      title: 'Guardar lectura?',
      text: "Deseas guardar la lectura con esas preguntas?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {

        //preparamos el conjunto
        this.conjunto = {}
        console.log("El puto conteniudo " + this.miContenido)
        let elcontenido = this.miContenido

        this.conjunto = {
          titulo: this.tituloLectura,
          textoGeneral: elcontenido,
          preguntas: this.preguntas

        }
        //agregamos a los Conjuntos pero antes lo vaciamos
        this.conjuntos = []
        this.conjuntos.push(this.conjunto)


        // Finalmente Preparamos el examen
        let materia = this.materia
        //console.log(materia)
        let bloque = this.bloque.nombre
        //console.log(bloque)

        //console.log(titulo)

        this.examenLectura = {}
        this.examenLectura = {
          id: materia + "-" + bloque,
          nombre: materia,
          conjuntos: this.conjuntos

        }

        console.log("Preguntas que saldran fueraAAAAA "+this.preguntas)

        this.http.post<Estatus>(Globales.urlBase + "/examen-lectura", this.examenLectura).subscribe(

          estatus => {
            console.log("SE ha enbviado con exito")
            this.estatus = estatus;




            //Ni modo borramos las preguntas y los conjuntosddda
            this.preguntas = []
            this.conjuntos = []
            //Desabilitamos los tabs
            this.idValido = false



          })
      }
    })
  }


  //Modificar un conjunto  ya encontardo
  modificar(miConjunto: Conjunto, indice: number) {
    //NO sabemos qué demonios modificará de los 3 por lo tanto asignamos cada una de las 3 
   // 1. Conjunto.   sssss
    this.conjunto = miConjunto
    this.indiceConjunto = indice
  

    //2. Preguntas de dicho conjunto
    this.preguntas=this.conjunto.preguntas


    //Obtenemos 
    console.log("Titulo " + miConjunto.titulo)
    console.log("Indice de la ṕregunta " + indice)
    console.log("Preguntas totales "+this.preguntas.length)


    this.indiceTab = 2




  }

  modificarPregunta(pregunta:Pregunta, indicePregunta:number){

    this.iniciarFormulario();

    this.form.controls['opcion1'].setValue(this.preguntaActual.opciones[0].titulo)
    this.form.controls['opcion2'].setValue(this.preguntaActual.opciones[1].titulo)
    this.form.controls['opcion3'].setValue(this.preguntaActual.opciones[2].titulo)
    this.form.controls['opcion4'].setValue(this.preguntaActual.opciones[3].titulo)

  
  }
modificarPregunta2(i:number){
  console.log("indice de pregunta "+i)
  this.indicePregunta=i
}



  actualizarPregunta(){
    //console.log("la opcion 2 ess"+this.op2.checked);
   


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
    this.opcionesActuales = [
      { titulo: op1, acierto: false },
      { titulo: op2, acierto: false },
      { titulo: op3, acierto: false },
      { titulo: op4, acierto: false }
    ]

    //Ajustamos el valor de la opción valida
    console.log("indice seleccionadfo "+this.indiceSeleccionado)
    this.opcionesActuales[this.indiceSeleccionado].acierto = true

    this.preguntaActual.opciones=this.opcionesActuales
    this.preguntas[this.indicePregunta]=this.preguntaActual
    this.examenLectura.conjuntos[this.indiceConjunto]=this.conjunto

    //Actualizamos



    this.http.post<Estatus>(Globales.urlBase + "/examen-lectura/"+this.idExamen+"/"+this.indiceConjunto+"/"+this.indicePregunta,this.preguntaActual).subscribe(

      estatus => {
       
        this.estatus = estatus;

 console.log("SE ha enbviado con exito mensaje "+this.estatus.mensaje)



        //Ni modo borramos las preguntas y los conjuntos
        this.preguntas = []
        this.conjuntos = []
        this.preguntaActual={}
        //Desabilitamos los tabs
        this.idValido = false
        Swal.fire({
          icon: 'success',
          title: 'Lectura',
          confirmButtonText: 'Lectura modificada con éxito',
          text: this.estatus.mensaje,
        })



      })



  }

  modificarLectura() {

    this.examenLectura.conjuntos[this.indiceConjunto].textoGeneral = this.miContenido

    this.http.post<Estatus>(Globales.urlBase + "/examen-lectura"+"/"+this.idExamen+"/"+this.indiceConjunto+"/"+this.indicePregunta,this.preguntaActual).subscribe(

      estatus => {
        console.log("SE ha enbviado con exito")
        this.estatus = estatus;


        Swal.fire({
          icon: 'success',
          title: 'Lectura',
          confirmButtonText: 'Lectura modificada con éxito',
          text: this.estatus.mensaje,
        })

        //Ni modo borramos las preguntas y los conjuntos
        this.preguntas = []
        this.conjuntos = []
        //Desabilitamos los tabs
        this.idValido = false



      })
  }
  opcionSeleccionada(opcion: string) {
    console.log("Opcion es " + opcion)

    if(opcion==='Agregar Pregunta'){
      this.iniciarFormulario()
      this.form.reset();
      this.preguntaActual={}
      //El siguiente es para asignar el nuevo indice que debe ser el de la ultima pregunta
   let indiceUltimaPregunta=   this.conjunto.preguntas.length;
   console.log("El indice de la ultima prg. sera "+indiceUltimaPregunta+" El conjunto es "+this.indiceConjunto);
    }
  }

  guardarPreguntaAlConjunto(){
    let indiceUltimaPregunta=   this.conjunto.preguntas.length;

    
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
    this.opcionesActuales = [
      { titulo: op1, acierto: false },
      { titulo: op2, acierto: false },
      { titulo: op3, acierto: false },
      { titulo: op4, acierto: false }
    ]

    //Ajustamos el valor de la opción valida
    console.log("indice seleccionadfo "+this.indiceSeleccionado)
    this.opcionesActuales[this.indiceSeleccionado].acierto = true

    this.preguntaActual.opciones=this.opcionesActuales
    this.preguntaActual.titulo=tituloPregunta
  //Para una nueva pregunta solo necesitamos el indice del conjunto, el id del examen y la prgunta  misma
  let idExamen=this.idExamen
  let idConjunto=this.indiceConjunto
  console.log("SALIDA id examen"+idExamen+" SALIDA INDICE CONJUNTO "+idConjunto);
   

  this.http.post<Estatus>(Globales.urlBase + "/examen-lectura/nueva-pregunta/"+this.idExamen+"/"+this.indiceConjunto,this.preguntaActual).subscribe(

    estatus => {
     
      this.estatus = estatus;

console.log("SE ha enbviado con exito mensaje "+this.estatus.mensaje)



      //Ni modo borramos las preguntas y los conjuntos
      this.preguntas = []
    //  this.conjuntos = []
      this.preguntaActual={}
      this.form.reset();
      //Desabilitamos los tabs
    //  this.idValido = false
      Swal.fire({
        icon: 'success',
        title: 'Pregunta de lectura',
        confirmButtonText: 'Pregunta agregada',
        text: this.estatus.mensaje,
      })



    })



  }
//Muy importante el siguiente es para regresa al menu inicial
  regresar(){
    this.idValido = false
    this.conjuntos=[]
    this.conjunto={}
    this.preguntas=[]
    this.preguntaActual={}
  }
}
