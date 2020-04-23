import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Video } from '../../modelo/video';
import { Globales } from '../../modelo/globales';

import { Router } from '@angular/router';
import { VgAPI } from 'videogular2/compiled/core'
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Estatus } from '../../modelo/estatus';
//const URL = "http://192.168.100.85:8080/api/archivalda"
const URL = "https://admingeer.herokuapp.com/api/archivalda"
@Component({
  selector: 'app-cargar-videos',
  templateUrl: './cargar-videos.component.html',
  styleUrls: ['./cargar-videos.component.css']
})
export class CargarVideosComponent implements OnInit {

  uploadForm: FormGroup;
  archivaldo: string = ''
  cargando = false
  porcentaje:number
completado:string
@ViewChild('videoPlayer', { static: false }) videoPlayer: any;
cargadoConExito:boolean

videourl:string 
videos_inf: Video[] = []
nombreVideo:string
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.videourl="https://geducativoedi.com.mx/"+this.nombreVideo;
    this.videos_inf = [

    //  { nombre: 'Informática 1', bloque: 'bloque 1', nombreCurso: 'Word Bloque 1', url: "https://geducativoedi.com.mx/inf1-b1-word.zip", ciclo: 1 },
   //   { nombre: 'Informática 1', bloque: 'bloque 2', url: "https://geducativoedi.com.mx/inf1-b2-excel.zip", ciclo: 1 },
   //   { nombre: 'Informática 1', bloque: 'bloque 3', url: "https://geducativoedi.com.mx/inf1-b3-profesor.zip", ciclo: 1 },

      { nombre: 'Informática 2', bloque: 'bloque 1', nombreCurso: 'Internet Bloque 1', url: "info2-bloque1-internet.mp4", ciclo: 2 },
      { nombre: 'Informática 2', bloque: 'bloque 2', nombreCurso: 'Internet Bloque 2', url: "info2-bloque2-internet.mp4", ciclo: 2 },
      { nombre: 'Informática 2', bloque: 'bloque 2', nombreCurso: 'Word Bloque 2', url: "info2-bloque2-word.mp4", ciclo: 2 },
      { nombre: 'Informática 2', bloque: 'bloque 1', nombreCurso: 'Word Bloque 1', url: "info2-bloque1-word.mp4", ciclo: 2 },
       {nombre:'Informática 2', bloque:'bloque 1',nombreCurso:'Excel Bloque 1', url:" info2-bloque1-excel.mp4", ciclo:2},
        {nombre:'Informática 2', bloque:'bloque 1',nombreCurso:'Power Point Bloque 1', url:" info2-bloque1-powerpoint.mp4", ciclo:2},
        {nombre:'Informática 2', bloque:'bloque 2',nombreCurso:'Excel Bloque 2', url:" info2-bloque2-excel.mp4", ciclo:2},
        {nombre:'Informática 2', bloque:'bloque 2',nombreCurso:'Power Point Bloque 2', url:" info2-bloque2-powerpoint.mp4", ciclo:2},
        {nombre:'Informática 2', bloque:'bloque 3',nombreCurso:'Excel Bloque 3', url:" info2-bloque3-excel.mp4", ciclo:2},
        {nombre:'Informática 2', bloque:'bloque 3',nombreCurso:'Internet Bloque 3', url:" info2-bloque3-internet.mp4", ciclo:2},
        {nombre:'Informática 2', bloque:'bloque 3',nombreCurso:'Power Point Bloque 3', url:" info2-bloque3-powerpoint.mp4", ciclo:2},
        {nombre:'Informática 2', bloque:'bloque 3',nombreCurso:'Word Bloque 3', url:" info2-bloque3-word.mp4", ciclo:2},
        // {nombre:'Informática 2' ,bloque: 'bloque 2', url:"https://geducativoedi.com.mx/info2-bloque2-profesor.zip", ciclo:2},
      //  {nombre:'Informática 2' ,bloque: 'bloque 3', url:"https://geducativoedi.com.mx/info2-bloque3-profesor.zip", ciclo:2},


     // { nombre: 'Informática 3', bloque: 'bloque 1', url: "https://geducativoedi.com.mx/inf3-b1-profesor.zip", ciclo: 3 },
   //   { nombre: 'Informática 3', bloque: 'bloque 2', url: "https://geducativoedi.com.mx/inf3-b2-profesor.zip", ciclo: 3 },
      { nombre: 'Informática 3', bloque: 'bloque 3', nombreCurso: 'Prueba x', url: "info3-bloque1-x.mp4", ciclo: 3 },


      { nombre: 'Informática 4', bloque: 'bloque 1', nombreCurso: 'Word Bloque 1', url: "info4-bloque1-word.mp4", ciclo: 4 },
      { nombre: 'Informática 4', bloque: 'bloque 1', nombreCurso: 'Excel Bloque 1', url: "info4-bloque1-excel.mp4", ciclo: 4 },
      //   {nombre:'Informática 4', bloque:'bloque 1', nombreCurso:'App Inventor Bloque 1', url:"https://geducativoedi.com.mx/info4-bloque1-appinventor.zip", ciclo:4},
       {nombre:'Informática 4', bloque:'bloque 1', nombreCurso:'Programación Bloque 1', url:"info4-bloque1-programacion.mp4", ciclo:4},
       {nombre:'Informática 4', bloque:'bloque 1', nombreCurso:'AppInventor Bloque 1', url:" info4-bloque1-appinventor.mp4", ciclo:4},
       {nombre:'Informática 4', bloque:'bloque 2', nombreCurso:'Programación Bloque 2', url:" info4-bloque2-programacion.mp4", ciclo:4},
       {nombre:'Informática 4', bloque:'bloque 2', nombreCurso:'Excel, Bloque 2', url:" info4-bloque2-excel.mp4", ciclo:4},
       {nombre:'Informática 4', bloque:'bloque 2', nombreCurso:'Word, Bloque 2', url:" info4-bloque2-word.mp4", ciclo:4},

       
      {nombre:'Informática 4', bloque:'bloque 3', nombreCurso:'Programación Bloque 3', url:" info4-bloque3-programacion.mp4", ciclo:4}, 
      {nombre:'Informática 4', bloque:'bloque 3', nombreCurso:'Excel, Bloque 3', url:" info4-bloque3-excel.mp4", ciclo:4},
      {nombre:'Informática 4', bloque:'bloque 3', nombreCurso:'Word, Bloque 3', url:" info4-bloque3-word.mp4", ciclo:4}
      //  {nombre:'Informática 4', bloque: 'bloque 2', url:"https://geducativoedi.com.mx/info4-bloque2-profesor.zip",ciclo:4},
      // {nombre:'Informática 4', bloque: 'bloque 3', url:"https://geducativoedi.com.mx/info4-bloque3-profesor.zip",ciclo:4 }
    ]

   }

  ngOnInit() {
    this.cargadoConExito=false
    this.uploadForm = this.formBuilder.group({
      file: [''],
      nombre: [null],

    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      console.log('menso ' + file.name)
      this.archivaldo = file.name
      this.uploadForm.get('file').setValue(file);
      this.nombreVideo=''
    }
  }

  obtenerVideo(valor){
    console.log("Valor "+valor)
    this.videourl=valor
  }
  onSubmit() {
    this.cargadoConExito=false
    this.completado=''
    this.cargando = true
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value)

    console.log('El nombre del video es'+this.nombreVideo)
    formData.append('nombre', this.nombreVideo)
    ;

    /*
    this.httpClient.post<Estatus>(URL, formData).subscribe(
      res => {
        this.cargando = false
        console.log("Llego la respuesta es " + res.mensaje);



      }
    );  */


    const req = new HttpRequest('POST', URL, formData, {
      reportProgress: true,
    });
    
    this.httpClient.request(req).subscribe(event => {
      // Via this API, you get access to the raw event stream.
      // Look for upload progress events.
     
      if (event.type === HttpEventType.UploadProgress) {
        // This is an upload progress event. Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
      this.porcentaje=percentDone
      console.log('Subiendo...'+this.porcentaje)
   
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {

        //La siguiente new Date que concatenamos es un cache breaker es importantisimo para poder
        //refreshcar el recurso de la url sobre la misma url una vez que se actualiza el video que se subió
        this.videourl="https://geducativoedi.com.mx/video/"+this.nombreVideo+"?"+new Date().getTime();
        
        console.log("Linnk de puto video "+this.videourl)
        console.log('Se completó la subida del archivo!');
        this.completado='Se completó la subida del archivo!'
        this.cargando=false;
        this.cargadoConExito=true
      }
    });
  }
}
