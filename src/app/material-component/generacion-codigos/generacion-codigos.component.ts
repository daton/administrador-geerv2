import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { Estatus } from '../../modelo/estatus';
import { GeneradorClave } from '../../modelo/generadorclave';

import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generacion-codigos',
  templateUrl: './generacion-codigos.component.html',
  styleUrls: ['./generacion-codigos.component.css']
})
export class GeneracionCodigosComponent implements OnInit {
  public form: FormGroup;
  indiceTab = 0;

  generadorClave:GeneradorClave={}

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
    '1-3',
    '2-4'
  ];
  constructor(private fb: FormBuilder, private http: HttpClient) {


  }

  ngOnInit() {

    this.form = this.fb.group({
      prefijo: [
        null,
        Validators.compose([Validators.required])
      ],

      cifras: [
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
  let prefijo=  this.form.get('prefijo').value
  let cifras=  this.form.get('cifras').value
  let anos=  this.form.get('anos').value
  let ciclos=  this.form.get('ciclos').value
  let numero=this.form.get('numero').value
  //console.log('prefijo '+prefijo+ ' cifras '+cifras+' años '+anos+' ciclos '+ciclos)
 this.generadorClave={
   prefijo:prefijo,
   cifras:cifras,
   numero:numero,
   ano:anos,
   ciclo:ciclos
 }

   //sigue http
   console.log(JSON.stringify(this.generadorClave))

  }

}
