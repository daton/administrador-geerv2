import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'ngx-quill';
import Quill from 'quill'



@Component({
  selector: 'app-cargar-andamios',
  templateUrl: './cargar-andamios.component.html',
  styleUrls: ['./cargar-andamios.component.css']
})
export class CargarAndamiosComponent implements OnInit {
  subtitle: string


  quill: Quill
  content:any
  contenido:any
  editor:any
  vista:Quill
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit() {
  // 
   // var recobrado = JSON.parse(jsonString);
   // this.quill=jsonString
   let jsonString=localStorage.getItem("contenido");
 
   this.contenido=JSON.parse(jsonString);
   console.log("Contenido"+jsonString)

   setTimeout(()=>{
   let jsonString=localStorage.getItem("contenido");
   this.quill.content=JSON.parse(jsonString);
   this.content=JSON.parse(jsonString);
  console.log(JSON.stringify(this.quill.content))

   }, 1200)


  }

  creado(event: Quill) {
    // tslint:disable-next-line:no-console
    this.quill=event
    
   
   let jsonString=localStorage.getItem("contenido");
   event.content=JSON.parse(jsonString);
   this.content=JSON.parse(jsonString);

   event.setContents(this.content)
  console.log("INvocado al crearlo "+JSON.stringify(event.content))
this.contenido=this.content
this.editor=this.quill.content
//event.enable(false);   


  }


  creado2(event: Quill) {
    // tslint:disable-next-line:no-console
    this.quill=event
    
   console.log("Invocando el quill-view")
   let jsonString=localStorage.getItem("contenido");
   event.content=JSON.parse(jsonString);
   this.content=JSON.parse(jsonString);

   event.setContents(this.content)
   event.enable(false); 


  }

  oprimirBoton(){
    console.log("Al oprimir el boton"+JSON.stringify(this.quill.content))
  this.editor.text="hola"
this.contenido=this.quill.content
  }

  cambiar(event:Quill) {
    console.log("evento"+JSON.stringify(event.content))
   localStorage.setItem("contenido",JSON.stringify(event.content) )


  }
}
