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

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  public form: FormGroup;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Profesor>

  displayedColumns = ['clave', 'nombre','usuario', 'password','fecha', 'hora'];

  indiceTab = 0;
  agregado: boolean

  cargando: boolean
  miClave = false
  selected:string
  profesor: Profesor = {}
  profesores:Profesor[]=[]
  materias: Materia[] = []
  estatus: Estatus = {}
  //Ojito
  hide = true;
  listaSistemas: string[] = [
    'BACHILLERES',
    'CONALEP',
    'CETIS',
    'CBETIS',
    'CECYT',
    'COBAEM',
    'UNAM'


  ];
  listaAreas: string[] = [
    'Informática',
    'Matemáticas',
    'Comunicación',
    'Desarrollo Humano'

  ];
  listaPlanteles: string[] = [
    'Plantel 1',
    'Plantel 2',
    'Plantel 3',
    'Plantel 4',
    'Plantel 5',
    'Plantel 6',
    'Plantel 7',
    'Plantel 8',
    'Plantel 9',
    'Plantel 10',
    'Plantel 11',
    'Plantel 12',
    'Plantel 13',
    'Plantel 14',
    'Plantel 15',
    'Plantel 16',
    'Plantel 17',
    'Plantel 18',
    'Plantel 19',
    'Plantel 20',

  ];
  listaTurnos: string[] = [
    'Matutino',
    'Vespertino',
    'Mixto'

  ];
  
  listaAreasMaterias: any[] = [
    {area:'Informática', nombre: 'Informática 1', prefijo: 'INF1' },
    {area:'Informática',  nombre: 'Informática 2', prefijo: 'INF2' },
    {area:'Informática',  nombre: 'Informática 3', prefijo: 'INF3' },
    {area:'Informática',  nombre: 'Informática 4', prefijo: 'INF4' },

    {area:'Matemáticas', nombre: 'Matemáticas 1', prefijo: 'MAT1' },
    {area:'Matemáticas', nombre: 'Matemáticas 2', prefijo: 'MAT2' },
    {area:'Matemáticas', nombre: 'Matemáticas 3', prefijo: 'MAT3' },
    {area:'Matemáticas', nombre: 'Matemáticas 4', prefijo: 'MAT4' },
    {area:'Matemáticas', nombre: 'Matemáticas 5', prefijo: 'MAT5' },
    {area:'Matemáticas', nombre: 'Matemáticas 6', prefijo: 'MAT6' },

    {area:'Comunicación', nombre: 'Lenguajes y comunicación 1', prefijo: 'LYC1' },
    { area:'Comunicación',nombre: 'Lenguajes y comunicación 2', prefijo: 'LYC2' },
    {area:'Comunicación', nombre: 'Literatura 1', prefijo: 'LIT1' },
    {area:'Comunicación', nombre: 'Literatura 2', prefijo: 'LIT2' },
    { area:'Comunicación',nombre: 'Taller de análisis de textos 1', prefijo: 'TAT1' },
    {area:'Comunicación', nombre: 'Taller de análisis de textos 2', prefijo: 'TAT2' },

  {area:'Desarrollo Humano', nombre: 'Orientación educativa', prefijo: 'OED' },
    {area:'Desarrollo Humano', nombre: 'Orientación vocacional', prefijo: 'OVO' },
    {area:'Desarrollo Humano', nombre: 'Artísticas 1', prefijo: 'ART1' },
    {area:'Desarrollo Humano', nombre: 'Artísticas 2', prefijo: 'ART2' },
    {area:'Desarrollo Humano', nombre: 'Introducción al trabajo', prefijo: 'TRA' },
    {area:'Desarrollo Humano', nombre: 'Administración de recursos humanos', prefijo: 'ARH' },
    {area:'Desarrollo Humano', nombre: 'Actividades deportivas 1', prefijo: 'ADE1' },
    {area:'Desarrollo Humano', nombre: 'Actividades deportivas 2', prefijo: 'ADE2' }
  ]
  listaMaterias: string[] = [
    'Informática 1',
    'Informática 2',
    'Informática 3',
    'Informática 4'

  ];


  constructor(private fb: FormBuilder, private http: HttpClient,private breakpointObserver: BreakpointObserver) {

    //El siguiente breakpoint es para hacer responsiva cada fila
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
      ['clave', 'nombre','usuario', 'password','fecha', 'hora']:
      ['clave', 'nombre','usuario', 'password','fecha','hora'];
    });

  }
  ngOnInit() {
    this.form = this.fb.group({
      codigo: [
        null,
        Validators.compose([
          Validators.required, /*CustomValidators.equal("123")*/

        ])
      ],
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
      ,
      nombre: [
        null,
        Validators.compose([Validators.required /*CustomValidators.url*/])
      ],
      usuario: [
        null,
        Validators.compose([Validators.required])
      ],
      paterno: [
        null,
        Validators.compose([Validators.required])
      ],
      materno: [
        null,
        Validators.compose([Validators.required])
      ],
      celular: [
        null,
        Validators.compose([Validators.required, CustomValidators.phone('MX')])
      ],
      telefono: [
        null,
        null
      ],
      planteles: [
        null,
        Validators.compose([Validators.required])
      ],
      turnos: [
        null,
        Validators.compose([Validators.required])
      ],
      sistemas: [
        null,
        Validators.compose([Validators.required])
      ],
      areas: [
        null,
        Validators.compose([Validators.required])
      ],
      materias: [
        null,
        Validators.compose([Validators.required])
      ],


      /*gender: [null, Validators.required],*/
      password: password,
    //  confirmPassword: confirmPassword
    });
//Inicializamos a los profesores

this.http.get<Profesor[]>(Globales.urlBase+"/profesor").subscribe(
  profesores=>{
    this.profesores=profesores;
    this.dataSource = new MatTableDataSource(this.profesores);

    //this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1200)

  }
)



  }
  actualizarProfesor() {



    //La materias
    console.log("La materias:" + this.form.get('materias').value)

    let valores = "" + this.form.get('materias').value
   let materiasSeleccionadas = valores.split(',')
    console.log("primera" + materiasSeleccionadas[0]);
   materiasSeleccionadas.forEach(elemento => {
      this.materias.push({
       campo: this.form.get('areas').value,
       nombre: elemento
      });
   })

 //   console.log("Todas las materias ya generadas:" + JSON.stringify(this.materias));

  this.profesor.materias=this.materias

    // Enviamos a http
    this.http.put(Globales.urlBase + "/profesor", this.profesor).subscribe(
      estatus => {
        this.estatus = estatus
        console.log("Ya esta todo bien " + this.estatus.mensaje)

        Globales.profesor=this.estatus.profesor

        Swal.fire({
          icon: 'success',
          title: 'Actualización',
          text: this.estatus.mensaje,
          confirmButtonText:'Aceptar',
          footer: 'GEER'
        })


      }
    )

    console.log("Profesor que se selecciono:" + JSON.stringify(this.profesor))
    this.materias = []
  }

  obtenerProfesores() {
    this.http.get<Profesor[]>(Globales.urlBase + "/profesor").subscribe(
      profesores=> {
        this.profesores = profesores;
        console.log("Profesores encontrados" + this.profesores.length)



        this.dataSource = new MatTableDataSource(this.profesores);

        //this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1200)


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
  modificar(claveProfesor: string) {
    this.indiceTab = 1
    //  this.perfil = this.data.find(obj => obj.email == email)
    console.log("Modificaras este id" + claveProfesor);


    //BUscamos de los obtenidos al seleccionado
    this.profesor = this.profesores.find(obj => obj.clave == claveProfesor)
    console.log("Profesor encontrado es este bastardo " + JSON.stringify(this.profesor))

    //Ajustamos los valore en cada uno de los campos
    var materiasLeidas:string[]=[]
    this.listaMaterias=[]

    this.profesor.materias.forEach(materia=>{
              materiasLeidas.push(materia.nombre)
           
    })
    //Las materias leidas son las materias que este profesor seleccino cuando se registro
    console.log("Materias solas leidas "+materiasLeidas+" Area del profesor")


    this.form.get('materias').setValue(materiasLeidas);

    //Ahora vamos a  llenar las materias con todas las posibles a seleccionar de esa area, que en la BD 
    //el profesor la tiene como "campo"
    //Barremos todas
    this.listaAreasMaterias.forEach(fila=>{
      if(fila.area===this.profesor.area){
        this.listaMaterias.push(fila.nombre)
      }
    })



    //this.dejandoClaveProfesor();

    /*
    if(this.perfil.idCampoClinico!=null){
      console.log("al modificar si existe un campos ya"+this.perfil.idCampoClinico)
      this.sedeDefecto = this.campos.find(obj => obj.id == this.perfil.idCampoClinico).sede
      console.log("La sede campo es "+this.sedeCampo);
      
    }
        this.sedeCampo=  this.campos[0].sede
        //document.getElementById("editar").scrollIntoView()
    
        */
  }

  onTabChanged($event) {
    let clickedIndex = $event.index;
    //Cambiamos al idncieTab al actual esto para recetearlo.
    this.indiceTab = clickedIndex
    console.log("cambio" + clickedIndex);
    if (clickedIndex == 0) {
      this.obtenerProfesores()
    }

  }


  //Para agregar un nuevo profesor
  agregar() {
    //Visualizamos el formulario

    this.agregado = true
  }

  guardarProfesor() {

    console.log("Profesor a guardar es " + JSON.stringify(this.profesor));

    this.http.put<Estatus>(Globales.urlBase + '/profesor', this.profesor).subscribe(
      estatus => {
        this.estatus = estatus
        this.profesor = this.estatus.profesor

        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: this.estatus.mensaje,
        })
      })


    //Para que se refresquen los alumnos ya con el guardaro
    this.obtenerProfesores()

  }

  borrarAlumno(email: string) {
    console.log("Se borrara" + email)

    this.obtenerProfesores()
  }



}