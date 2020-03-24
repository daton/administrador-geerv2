import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
const URL="http://192.168.100.85:8080/api/archivalda"
@Component({
  selector: 'app-cargar-videos',
  templateUrl: './cargar-videos.component.html',
  styleUrls: ['./cargar-videos.component.css']
})
export class CargarVideosComponent implements OnInit {

  uploadForm: FormGroup; 

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);

    this.httpClient.post<any>(URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
