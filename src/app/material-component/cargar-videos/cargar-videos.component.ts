import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Estatus } from '../../modelo/estatus';
const URL = "http://192.168.100.85:8080/api/archivalda"
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
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      console.log('menso ' + file.name)
      this.archivaldo = file.name
      this.uploadForm.get('file').setValue(file);
    }
  }
  onSubmit() {
    this.completado=''
    this.cargando = true
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);

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
   
        //console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        console.log('Se completó la subida del archivo!');
        this.completado='Se completó la subida del archivo!'
        this.cargando=false;
      }
    });
  }
}
