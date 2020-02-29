import { Component, OnInit } from '@angular/core';


import { Estatus } from '../../modelo/estatus';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Globales } from '../../modelo/globales';
import Swal from 'sweetalert2';
import { CustomValidators } from 'ng2-validation';
import { Alumno } from '../../modelo/alumno';
import { Profesor } from '../../modelo/profesor';
import { Materia } from '../../modelo/materia';


const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));



@Component({
  selector: 'app-claves-alumnos',
  templateUrl: './claves-alumnos.component.html',
  styleUrls: ['./claves-alumnos.component.css']
})
export class ClavesAlumnosComponent implements OnInit {


  miClaveAlumno:string
  public form: FormGroup;
  //Campos del listado

    //Ojito
    hide = true;
  estatus: Estatus = {}
  alumno:Alumno={}
  profesor:Profesor={}
  cargando:boolean
  cargandoClaveProfesor:boolean
  estatusClaveProfesor:Estatus={}
  miClaveProfesor = false
  mimateria:Materia={}

  miClaveLibro:string

  listaGrupos: string[] = [];
  listaPlanteles: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
   

  ];
  listaTurnos: string[] = [
    'Matutino',
    'Vespertino',
'Mixto'
  ];




  constructor(private http: HttpClient, private fb: FormBuilder ) { }

  ngOnInit() {
    this.estatus={
      success:false
    }

    this.profesor=Globales.profesor

 //Termina la parte de inicializacion de los profes encontrados
    //Empieza la validacion de los formularios
    this.form = this.fb.group({
      codigolibro: [
        null,
        Validators.compose([
          Validators.required,

        ])
      ],
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
      ,
      nombre: [
        null,
        Validators.compose([Validators.required, /*CustomValidators.url*/])
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
      claveprofesor: [
        null,
        Validators.compose([Validators.required])
      ],
      planteles: [
        null,
        Validators.compose([Validators.required])
      ],
      turnos: [
        null,
        Validators.compose([Validators.required])
      ],
      grupos: [
        null,
        Validators.compose([Validators.required])
      ],
      

      /*gender: [null, Validators.required],*/
      password: password,
 
    });




  }

  guardarAlumno() {

    console.log("Alumno a guardar es " + JSON.stringify(this.alumno));

    this.http.put<Estatus>(Globales.urlBase + '/alumno-clave', this.alumno).subscribe(
      estatus => {
        this.estatus = estatus
        this.alumno = this.estatus.alumno

        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          confirmButtonText:'Aceptar',
          text: this.estatus.mensaje,
        })
      })



  }

  buscarAlumno(){

    this.http.get<Estatus>(Globales.urlBase+"/admin-alumno/"+this.miClaveAlumno).subscribe(
      estatus=>{
        this.estatus=estatus;
        if(this.estatus.success) this.alumno=this.estatus.alumno;
   
      }
    )
  }
  


}