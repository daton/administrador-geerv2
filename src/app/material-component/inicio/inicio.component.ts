import { Component, OnInit } from '@angular/core';
import { Globales } from '../../modelo/globales';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Estatus } from '../../modelo/estatus';
import { Token } from '../../modelo/token';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  miToken: string
  token: Token = {}
  estatus: Estatus = {}


  constructor(private http: HttpClient) { }

  ngOnInit() {



  }

  subscribirse() {
    if (Globales.miToken != null) {
      this.miToken = Globales.miToken
      //Guardamos el token
      localStorage.setItem("miToken", Globales.miToken);


      //Guardamos el token en el back-end
      this.token = {
        token: Globales.miToken,
        usuario: Globales.administrador.usuario
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
