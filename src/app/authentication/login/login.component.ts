import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Profesor } from '../../modelo/profesor';
import { Alumno } from '../../modelo/alumno';
import { Estatus } from '../../modelo/estatus';
import { Globales } from '../../modelo/globales';
import { Administrador } from '../../modelo/administrador';

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
  hide = true
  administrador: Administrador = {}

  usuarios: Usuario[] = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'supervisor1', viewValue: 'Supervisor 1' },
    { value: 'supervisor2', viewValue: 'Supervisor 2' }
  ]

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

  onSubmit() {
    console.log("has hecho clickES" + JSON.stringify(this.form.value));
    console.log("asasas " + this.form.get("login").value)

    let login = this.form.get("login").value
    let password = this.form.get("password").value



    if (this.autenticar(login, password)) {

      //gUARDAMNOS  PARA LA SESION
      this.administrador = {
        usuario: login,
        password: password
      }
      Globales.administrador = this.administrador
      //Guardamos localmente
      console.log("Vamos a ver que pasa con el administrador .." + JSON.stringify(Globales.administrador));
      localStorage.setItem("miAdministrador", JSON.stringify(Globales.administrador));
      //this.administrador=JSON.parse(localStorage.getItem('miAdministrador'));

      this.mostrarError = false;
      this.router.navigate(["../material/inicio"], { skipLocationChange: true })
    }
    else {
      this.mostrarError = true;
    }
  }

  recuperar() {
    this.router.navigate(["/recuperar"], { skipLocationChange: true });
  }

  autenticar(usuario: string, password: string): boolean {
   

    console.log("Usuario seleccionado "+usuario+" password "+password)
    let valor = false
    if (usuario == 'admin' && password == 'admin2018') {
      console.log("Eres administrador" +Globales.esAdmin);
      valor = true;
      Globales.esAdmin = true;
    }else if (usuario == 'supervisor1' && password == 'supervisor1234') {
      valor = true;
      console.log("Eres supervisor 1"+Globales.esSupervisor1);
      Globales.esSupervisor1 = true;
    }else if (usuario === 'supervisor2' && password === 'supervisor4321') {
      console.log("Eres supervisor 2");
      valor = true;
    }
    console.log("valor del boooleano "+valor)

    return valor;
  }

}

export interface Usuario {
  value: string
  viewValue: string
}
