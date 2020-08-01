import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, SwPush, UpdateAvailableEvent } from '@angular/service-worker';
import { Administrador } from './modelo/administrador';
import * as firebase from 'firebase/app';

import { environment } from '../environments/environment';
import { Globales } from './modelo/globales';
import { AngularFireMessaging } from '@angular/fire/messaging';
import{mergeMapTo} from 'rxjs/operators'
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  administrador: Administrador = {}
  displayToken: string
  token:string


  private promptUser(): void {
    console.log('Actualizando a una nueva versión de admingeer');
    this.swUpdate.activateUpdate().then(() => document.location.reload()); 
  }
  public checkForUpdates(): void {
    this.swUpdate.available.subscribe(event => this.promptUser());
  }

  constructor(private router: Router, private swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => swUpdate.checkForUpdate()
        .then(() => console.log('checcando actualizaciones....')));
    
        
    }

console.log("que tan bueno que este en el cosntructor me pregunto..")



    //Leemos
    this.administrador = JSON.parse(localStorage.getItem('miAdministrador'));


    if (this.administrador == null) {
      this.router.navigate(['/authentication/login'], { skipLocationChange: true })


    } else {
      console.log("Bieenvenid pfffffsss " + this.administrador.usuario)
    }
    
         
}




  
  ngOnInit(): void {
    console.log("antes de  refrescarsee");
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("Nueva versión ya disponible, Descargarla?")) {
                console.log("Se debe refrescarsee");
              window.location.reload();
          }
      });
    }
        


  }

  /*
  permitToNotify() {
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => messaging.getToken().then(token => {
      this.displayToken = token

        //Asignamos el token a la variable global
        Globales.miToken = token

        console.log("Variable global token: " + Globales.miToken)
      }
      ))
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }*/


  

}
