import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, SwPush, UpdateAvailableEvent } from '@angular/service-worker';
import { Administrador } from './modelo/administrador';
import * as firebase from 'firebase/app';
import 'firebase/messaging'
import { environment } from '../environments/environment';
import { Globales } from './modelo/globales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  administrador: Administrador = {}
  displayToken: string


  constructor(private router: Router, private swUpdate: SwUpdate, private push: SwPush) {

    //Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
      navigator.serviceWorker.getRegistration().then(swr => firebase.messaging().useServiceWorker(swr));
    }

    //Leemos
    this.administrador = JSON.parse(localStorage.getItem('miAdministrador'));


    if (this.administrador == null) {
      this.router.navigate(['/authentication/login'], { skipLocationChange: true })


    } else {
      console.log("Bieenvenido " + this.administrador.usuario)
    }
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        if (confirm("Nueva version disponible!, ¿Deseas descargarla?")) {
          window.location.reload()
        }
      });
    }


    push.messages.subscribe(msg => console.log('push message', msg));
    push.notificationClicks.subscribe(click => console.log('notification click', click));
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
      navigator.serviceWorker.getRegistration().then(swr => firebase.messaging().useServiceWorker(swr));
    }


    //Invocamos el permity
    setTimeout(() => {
      this.permitToNotify();
      console.log("Permitidoooo con tokensito Y SERVICE WORKER MODIFICADO " + this.displayToken)
    }, 1800)

  }
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
  }

}
