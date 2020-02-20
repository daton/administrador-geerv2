import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  constructor(private router:Router, private swUpdate:SwUpdate ){
    this.router.navigate(['/authentication/login'],{skipLocationChange:true})

    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe((event:UpdateAvailableEvent)=>{
        if(confirm("Nueva version disponible!, ¿Deseas descargarla?")){
          window.location.reload()
        }
      });
    }
    
  }
}
