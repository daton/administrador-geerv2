
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
import { } from 'ngx-quill';
import Quill from 'quill'
import { ExamenOpciones } from '../../modelo/examen-opciones';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generaexam-opciones',
  templateUrl: './generaexam-opciones.component.html',
  styleUrls: ['./generaexam-opciones.component.css']
})
export class GeneraexamOpcionesComponent implements OnInit {

  puedeAdministrarReactivos = false
  mitipo: any = {}
  examenOpciones: ExamenOpciones;
  texto: string
  opcion1: string

  indiceDePregunta: number = -1




  materias: string[] = ['Materia demo', 'Informática 2', 'Informática 4', 'Lenguajes y comunicación 1', 'Lenguajes y comunicación 2', 'Literatura 1', 'Literatura 2', 'Taller de análisis de textos 1', 'Taller de análisis de textos 2']

  radios: any[] = [{ indice: 0, checado: false }, { indice: 1, checado: false }, { indice: 2, checado: false }, { indice: 3, checado: false }];
  radio1checado: boolean = false
  indiceSeleccionado: number

  bloqueExamen: any[] = [{ nombre: 'diagnostico', nombreLargo: 'Diagnóstico' }, { nombre: 'b1', nombreLargo: 'Bloque 1' }, { nombre: 'b2', nombreLargo: 'Bloque 2' }, { nombre: 'b3', nombreLargo: 'Bloque 3' }]
  bloque: any = null
  examen: Examen = {}
  mostrarFormulario: boolean
  mostrarSeleccionarMateria: boolean
  materia: string
  indiceTab = 0;

  agregado: boolean
  mostrarPreguntas: boolean
  quill: Quill = {}
  quill2: Quill
  //quillBuble: Quill
  quillBubles: Quill[] = []
  content: any
  contenido: any
  editor: any
  editor2: Quill
  editorLeido: any
  vista: Quill
  focused = false
  blured = false
  cargando: boolean
  miClave = false
  selected: string
  selectedValue: string;
  paraActualizar: boolean;
  gato: any
  guardandoPregunta: boolean
  borrando: boolean = false

  preguntaActual: Pregunta;
  opcionesActuales: Opcion[]
  maximoPreguntas: number
  indicePreguntas: number



  estatus: Estatus = {}
  //Ojito
  hide = true;
  id: string

  //Formulario


  public form: FormGroup;

  public formita: FormGroup;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Pregunta>



  seleccionMateriaBloque: boolean = false

  preguntas: Pregunta[] = []
  //Este es para que no aparezca una pregunta de defecto seleccionada al cambiar de la lista a Guardar Pregunt

  seSeleccionoPregunta: boolean

  searchText: any;
  displayedColumns: string[] = ['numero', 'tituloTexto'];


  constructor(private fb: FormBuilder, private http: HttpClient, private breakpointObserver: BreakpointObserver, private snackBar: MatSnackBar) {

    //El siguiente breakpoint es para hacer responsiva cada fila
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['numero', 'tituloTexto'] :
        ['numero', 'tituloTexto'];
    });
  }


  ngOnInit() {

    //Reiniciamos los reactrivos, para la vez que los examenes no tienen ningun reactivo
    this.examen = {}
    this.preguntas = []
    this.examen.preguntas = this.preguntas
    this.guardandoPregunta = false

    //Este es para que no indique que hay una pregunta seleccionada y no se muestre la
    //
    this.indicePreguntas = 0;

    //El siguiente es para diferenciar entre guardar y actualizar -1 es para guardar por defecto
    this.indiceDePregunta = -1


    this.mostrarSeleccionarMateria = true
    this.mostrarPreguntas = false
    this.mostrarFormulario = false
    this.iniciarFormulario()
    this.iniciarFormulario2()


  }

  iniciarFormulario2() {
    this.formita = this.fb.group({
      materia: [null, Validators.compose([Validators.required])],
      bloque: [null, Validators.compose([Validators.required])]


    })
  }
  iniciarFormulario() {
    this.form = this.fb.group({

      selectedValue: [
        null,
        Validators.compose([Validators.required])


      ],
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

  creado(event: Quill) {
    // Este es super importante este se lo pasamos al this.contenido mas adelante
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
    this.quill2 = event


    //let jsonString = localStorage.getItem("contenido");
    //event.content = JSON.parse(jsonString);

    //El contenido de el editor a JSON
    //this.content = JSON.parse(jsonString);

    event.setContents(this.content)
    console.log("INvocado al crearlo " + JSON.stringify(event.content))
    this.contenido = this.content

    //event.enable(false);   


  }

  cambiar(event: Quill) {
    // tslint:disable-next-line:no-console
    // this.quill = event


    //let jsonString = localStorage.getItem("contenido");
    //event.content = JSON.parse(jsonString);

    //El contenido de el editor a JSON
    //this.content = JSON.parse(jsonString);

    // event.setContents(JSON.parse(this.conjunto.textoGeneral))
    console.log("INvocado al crearlo modificarlo")

    //Agregamos el contenido 
    this.texto = event.text
    this.contenido = event.content
    this.editor = this.quill
    console.log("Vamos a ver que pasa CON ESTE" + this.texto)
    console.log("EL CONTENIDO A AMBIAR Y GIARDAR ES " + this.contenido)
    //event.enable(false);   

  }

  onTabChanged($event) {
    let clickedIndex = $event.index;
    //Cambiamos al idncieTab al actual esto para recetearlo.
    this.indiceTab = clickedIndex
    console.log("cambio" + clickedIndex);
    if (clickedIndex == 0) {
      console.log("Cliqueamos esta opcion")
      // this.form.reset()
      //  this.iniciarFormulario()
      if (!this.seSeleccionoPregunta) this.form.reset()

      // this.indiceSeleccionado=null

    }
    if (clickedIndex === 1) {
      console.log("Seleccionaste la edición de preguntas");
      this.leerPregunta();



    }
    if(clickedIndex===2){
      this.leerPregunta();
    
    }

  }

  cargarReactivos(materia: string, bloque: any) {
    //Mostramos la pantalla de los tabs
    this.puedeAdministrarReactivos = true
    this.preguntas = []
    console.log("Preguntas en el poool " + this.preguntas.length)
    this.preguntaActual = {}

    this.indiceTab = 0
    this.materia = materia
    this.bloque.nombre = bloque.nombre
    this.id = materia + "-" + bloque.nombre
    console.log("Son " + materia + "-" + bloque.nombre)
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

  guardarPregunta() {
    this.guardandoPregunta = true
    //Buscamos la materia
    let miMateria = this.materia
    let bloque = this.bloque.nombre

    //Ajustamos el id
    let id = miMateria + '-' + bloque;

    console.log("Materia " + this.materia)
    console.log("Bloque " + this.bloque.nombre)
    console.log(JSON.stringify(this.contenido))

    //
    console.log("Indice seleccionado " + this.indiceSeleccionado)
    console.log("Primera " + this.form.get('opcion1').value)
    console.log("Seg " + this.form.get('opcion2').value)
    console.log("Ter " + this.form.get('opcion3').value)
    console.log("cuar " + this.form.get('opcion4').value)

    //7El siguiente es para limpiar el radio Group si funciona a la prefeccion!!
    //this.indiceSeleccionado=null

    console.log('INDICE SELECCIONAD ES  ' + this.indiceSeleccionado)
    //Creamos las opciones
    let opciones: Opcion[] = [
      { titulo: this.form.get('opcion1').value, acierto: this.indiceSeleccionado === 0 ? true : false },
      { titulo: this.form.get('opcion2').value, acierto: this.indiceSeleccionado === 1 ? true : false },
      { titulo: this.form.get('opcion3').value, acierto: this.indiceSeleccionado === 2 ? true : false },
      { titulo: this.form.get('opcion4').value, acierto: this.indiceSeleccionado === 3 ? true : false },
    ]

    console.log("Opciones a envirse soooooooon:" + JSON.stringify(opciones))

    //El siguiente ya funciona pero no deseo probarolo por ahora, es para ajustar el contenido
    // this.quill2.setContents(this.contenido)

    //Convertimos a un string el titulo GUARDAMOS MEJOR EL QUILL YA QUE PODEMO DSPLEGALO COMO TEXTO
    //TEXTO PLANO O COMO LO QUE SEA HTML CONTENT, ETC
    //ng serve let miTitulo = JSON.stringify(this.quill.getContents());
    // console.log(JSON.stringify(this.quill.getContents()))


    let pregunta: Pregunta = {
      titulo: JSON.stringify(this.contenido),
      tituloTexto: this.texto
    }

    //Ajustamos la pregunta
    pregunta.opciones = opciones


    //Enviamos la pregunta

    this.http.post<Estatus>(Globales.urlBase2 + "/examen-opciones/nuevo-reactivo/" + this.id + "/" + this.indiceDePregunta, pregunta).subscribe(
      estatus => {
        this.estatus = estatus
        console.log("EStus " + this.estatus.mensaje)

        this.form.reset()
        this.indiceSeleccionado = 0
        //Este limpia el maldito QUILL
        //    this.gato = ''
        //Ya no se carga
        this.guardandoPregunta = false

        //Ponemos el indiceDepregunta a -1 porque too estara limpio
        this.indiceDePregunta = -1

        //Indicamos que no seleccinamos ninguna pregunta 
        this.seSeleccionoPregunta = false

        //Limpiamos  Quill
        this.quill.setContents([{ insert: '\n' }]);
      }
    )


  }
  limpiar() {
    this.form.reset()
    this.indiceSeleccionado = 0
    //Este limpia el maldito QUILL
    //    this.gato = ''
    //Ya no se carga
    this.guardandoPregunta = false

    //Ponemos el indiceDepregunta a -1 porque too estara limpio
    this.indiceDePregunta = -1

    //Limpiamos  Quill
    this.quill.setContents([{ insert: '\n' }]);
  }
  puta() {
    console.log('hay putaaa')

    this.gato = ''
  }
  leerPregunta() {

    //Limpiamos los QuillBubles  de la vista Preliminar
    this.quillBubles=[]
    this.preguntas=[]

    this.guardandoPregunta = true
    let id = this.id

    this.http.get<ExamenOpciones>(Globales.urlBase2 + "/examen-opciones/leer-reactivo/" + id).subscribe(
      examen => {
        this.examenOpciones = examen
        console.log("EStus " + this.examenOpciones.preguntas.length)
        this.maximoPreguntas = this.examenOpciones.preguntas.length
        console.log("Cantidad de pregunats encontradas " + this.maximoPreguntas)


        //Ajustamos el titulo de la pregunta a lo que seria el 
        //Ponemos en el texto la primera
        let quillito = JSON.parse(this.examenOpciones.preguntas[this.maximoPreguntas - 1].titulo);

        this.texto = quillito
        this.preguntas = this.examenOpciones.preguntas
        this.preguntaActual = this.preguntas[this.indicePreguntas]


        //Ajustamos las  opciones en el formulario

        this.form.controls['opcion1'].setValue(this.preguntaActual.opciones[0].titulo);
        this.form.controls['opcion2'].setValue(this.preguntaActual.opciones[1].titulo);
        this.form.controls['opcion3'].setValue(this.preguntaActual.opciones[2].titulo);
        this.form.controls['opcion4'].setValue(this.preguntaActual.opciones[3].titulo);



        this.guardandoPregunta = false

        //Ajustamos el valor del indce

        this.preguntaActual.opciones.forEach((op, index) => {
          if (op.acierto === true) {
            this.indiceSeleccionado = index

          }
        })

        this.dataSource = new MatTableDataSource(this.preguntas);


        //El siguiente es para lleanr los QuillBubles que van a leer las preguntas en Vsta preliminar
        
        this.preguntas.forEach((pregunta, i) => {
          let quillsito: Quill = {}
          quillsito.content = JSON.parse(pregunta.titulo)
          this.quillBubles.push(quillsito)
        })

        setTimeout(() => {

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1500)

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
  borrarQuill() {
    console.log("A borrar")
    this.quill.setContents([{ insert: '\n' }]);
  }

  actualizar(pregunta: Pregunta, indice: number) {

    //******************************************************************************* */
    //Este actualizar no lleva el metodo post en realidad es el mismo d guardar simplemente agregamos
    //en el back end un indice si -1 es guardar si es otro, pues es una actualización
    this.indiceDePregunta = indice
    //Limpiamos el Quill, recuera nunca inicializar el puto Quill dentro del metodo cambiar()


    //Birramos el contenido de kill
    this.quill.setContents([{ insert: '\n' }]);

    //Tambien decimos que se oprimio un indice de pregunta para que no se muestre una de defercto
    this.seSeleccionoPregunta = true

    this.iniciarFormulario()

    this.preguntaActual = pregunta;
    console.log("Preunta " + pregunta.tituloTexto);
    this.indiceTab = 0
    console.log(JSON.stringify(pregunta.titulo))
    setTimeout(() => {
      if (this.quill != null) {
        console.log("El quill es ditinto de nukl")
      } else {
        console.log("Este eel quill es null")
      }
      this.quill.updateContents(JSON.parse(pregunta.titulo));
    }, 1200)


    this.form.controls['opcion1'].setValue(pregunta.opciones[0].titulo);
    this.form.controls['opcion2'].setValue(pregunta.opciones[1].titulo);
    this.form.controls['opcion3'].setValue(pregunta.opciones[2].titulo);
    this.form.controls['opcion4'].setValue(pregunta.opciones[3].titulo);

    this.opcion1 = pregunta.opciones[0].titulo

    // console.log("Que pasosssss" + pregunta.opciones[0].titulo)
    //Ajustamos el valor del indce
    pregunta.opciones.forEach((op, index) => {
      if (op.acierto === true) {
        this.indiceSeleccionado = index
        this.radios[index].checado = true

      }
    })
    console.log("EL INDICE SELECCIONADO ES " + this.indiceSeleccionado)

  }

  borrar(pregunta: Pregunta, indice: number) {
    this.borrando = true
    let miMateria = this.materia
    let bloque = this.bloque.nombre
    //Ajustamos el id
    let id = miMateria + '-' + bloque;
    this.snackBar.open("Borrando el reactivo, espere por favor...", "", {
      duration: 3500,
    });


    console.log("Indice a borarra " + indice)
    console.log("Nombre examen" + id)

    this.http.delete<Estatus>(Globales.urlBase2 + "/examen-opciones/borrar-pregunta/" + id + "/" + indice).subscribe(
      estatus => {
        this.estatus = estatus
        console.log(this.estatus.mensaje)
        this.borrando = false


        Swal.fire({
          icon: 'success',
          title: 'Borrado',

          text: this.estatus.mensaje,
        })
        // Quitamos la pregunta para no dar ida y vuelta en leeer para que se refresque la pregunta
        this.preguntas.splice(indice, 1);

        //Reajustamos el data source
        this.dataSource = new MatTableDataSource(this.preguntas);

        setTimeout(() => {

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1500)


      })

  }
}
