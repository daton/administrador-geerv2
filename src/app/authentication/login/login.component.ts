import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Profesor } from '../../modelo/profesor';
import { Alumno } from '../../modelo/alumno';
import { Estatus } from '../../modelo/estatus';
import { Globales } from '../../modelo/globales';

export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 //Para ocultar mostrar password
hide=true


alumno: Alumno = {};
estatus: Estatus = {};
mostrarError: boolean = false;
public form: FormGroup;
constructor(private fb: FormBuilder, private router: Router, public http: HttpClient) { }

ngOnInit() {
  this.form = this.fb.group({
    login: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
  });
}

onSubmit(){
  console.log("has hecho click"+JSON.stringify(this.form.value));
console.log("asasas "+this.form.get("login").value)
if(this.form.get("login").value=='admin'&&this.form.get("password").value=='admin2018'){
 this.mostrarError=false;
 this.router.navigate(["../material/inicio"], { skipLocationChange: true })
}
  else{
    this.mostrarError=true;
  }
 }

recuperar(){
  this.router.navigate(["/recuperar"], { skipLocationChange: true });
}

}
