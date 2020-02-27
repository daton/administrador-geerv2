import { Component, OnInit } from '@angular/core';
import { Globales } from '../../modelo/globales';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Estatus } from '../../modelo/estatus';
import { Token } from '../../modelo/token';
import { Administrador } from '../../modelo/administrador';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  miToken: string
  token: Token = {}
  estatus: Estatus = {}
  administrador:Administrador={}


  constructor(private http: HttpClient) { 

        //Leemos
        this.administrador = JSON.parse(localStorage.getItem('miAdministrador'));
    console.log("Vamos en oninit de inicio"+JSON.stringify(Globales.administrador));
    
    


  }

  ngOnInit() {
//Por lo pronto no hay nada
console.log("El token global es este "+Globales.miToken)
  }

 

  subscribirse() {

    console.log("AL SUBSCRIBIRSE "+Globales.miToken)
    if (Globales.miToken != null) {
      this.miToken = Globales.miToken
      //Guardamos el token
      localStorage.setItem("miToken", Globales.miToken);


      //Guardamos el token en el back-end
      this.token = {
        token: Globales.miToken,
        usuario: this.administrador.usuario
      }

      this.http.post<Estatus>(Globales.urlBase + "/token", this.token).subscribe(
        estatus => {
          this.estatus = estatus;

          //Notificamos que ya estas inscrito
          Swal.fire({
            icon: 'success',
            title: 'Notificaciones',
            text: 'Ya estás inscrito al sistema de notificaciones!',
            confirmButtonText: 'Aceptar',
            footer: 'GEER'
          })

        }
      )


      console.log("Tu token es " + this.miToken);
    } else {
      //Notificamos que ya estas inscrito
      Swal.fire({
        icon: 'error',
        title: 'Notificaciones',
        text: 'No se pudo realizar la inscripción, probablemente no aceptaste las notificaciones al inicio de la aplicación.',
        confirmButtonText: 'Aceptar',
        footer: 'GEER'
      })

    }
  }

}
