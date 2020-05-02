import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { Estatus } from '../../modelo/estatus';
import { GeneradorClave } from '../../modelo/generadorclave';

import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { materialize } from 'rxjs/operators';
import { Globales } from '../../modelo/globales';

@Component({
  selector: 'app-generacion-codigos',
  templateUrl: './generacion-codigos.component.html',
  styleUrls: ['./generacion-codigos.component.css']
})
export class GeneracionCodigosComponent implements OnInit {
  public form: FormGroup;
  public form2: FormGroup;
  indiceTab = 0;
  estatus: Estatus = {}
  mensaje=''

  generadorClave: GeneradorClave = {}
  estaEnviando: boolean
  miMateriaSeleccionada:any={}

  listaAnos: string[] = [
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26'


  ];
  listaCiclos: string[] = [
    '01',
    '02'
  ];

  listaMaterias: any[] = [
    { nombre: 'Informática 1', prefijo: 'INF1' },
    { nombre: 'Informática 2', prefijo: 'INF2' },
    { nombre: 'Informática 3', prefijo: 'INF3' },
    { nombre: 'Informática 4', prefijo: 'INF4' },

    { nombre: 'Matemáticas 1', prefijo: 'MAT1' },
    { nombre: 'Matemáticas 2', prefijo: 'MAT2' },
    { nombre: 'Matemáticas 3', prefijo: 'MAT3' },
    { nombre: 'Matemáticas 4', prefijo: 'MAT4' },
    { nombre: 'Matemáticas 5', prefijo: 'MAT5' },
    { nombre: 'Matemáticas 6', prefijo: 'MAT6' },

    { nombre: 'Lenguajes y comunicación 1', prefijo: 'LYC1' },
    { nombre: 'Lenguajes y comunicación 2', prefijo: 'LYC2' },
    { nombre: 'Literatura 1', prefijo: 'LIT1' },
    { nombre: 'Literatura 2', prefijo: 'LIT2' },

    { nombre: 'Taller de análisis de textos 1', prefijo: 'TAT1' },
    { nombre: 'Taller de análisis de textos 2', prefijo: 'TAT2' },

    { nombre: 'Orientación educativa', prefijo: 'OED' },
    { nombre: 'Orientación vocacional', prefijo: 'OVO' },
    {nombre:'Artísticas 1', prefijo:'ART1'},
    {nombre:'Artísticas 2', prefijo:'ART2'},
    { nombre: 'Administración de recursos humanos', prefijo: 'ARH' },
    { nombre: 'Actividades deportivas 1', prefijo: 'ADE1' },
    {nombre:'Introducción al trabajo', prfijo:'TRA'},
    { nombre: 'Actividades deportivas 2', prefijo: 'ADE1' }
  ]
  constructor(private fb: FormBuilder, private http: HttpClient) {


  }

  ngOnInit() {
    this.estaEnviando = false
    this.mensaje=''

    this.form = this.fb.group({

      materias: [
        null,
        Validators.compose([Validators.required])
      ],

      numero: [
        null,
        Validators.compose([Validators.required])
      ],


      anos: [
        null,
        Validators.compose([Validators.required])
      ],
      ciclos: [
        null,
        Validators.compose([Validators.required])
      ]
    });


  }

  generarClaves() {
    //Recopilamos los campos
    this.estaEnviando = true
    console.log('aaaa ' + this.form.get('materias').value)
    this.mensaje='Esta opeación puede tardar hasta 15 minutos o mas dependiendo del número de claves, espere por favor...'


    let materia = this.form.get('materias').value

    let anos = this.form.get('anos').value
    let ciclos = this.form.get('ciclos').value
    let numero = this.form.get('numero').value


    //console.log('prefijo '+prefijo+ ' cifras '+cifras+' años '+anos+' ciclos '+ciclos)
    this.generadorClave = {

      materia: materia.nombre,
      prefijo: materia.prefijo,
      numero: numero,
      ano: anos,
      ciclo: ciclos
    }

    //sigue http
    console.log(JSON.stringify(this.generadorClave))
    this.http.post<Estatus>(Globales.urlBase + "/generadorclave", this.generadorClave).subscribe(
      estatus => {
        this.estatus = estatus


        Swal.fire({
          icon: 'success',
          title: 'Códigos generados',
          confirmButtonText: 'Aceptar',
          text: this.estatus.mensaje,
        })
        this.estaEnviando = false;

      }

    )

  }

  onTabChanged(event) {

  }

  descargarExcel() {
    this.mensaje='Por favor esper esta operacion puede tardar hasta 15 minutos o mas...'
    console.log("Materia seleccionada es " + this.miMateriaSeleccionada.nombre);

let URL=Globales.urlBase+"/descargarexcel/"+this.miMateriaSeleccionada.nombre;
    window.location.assign(URL);
    

    
  }

}
