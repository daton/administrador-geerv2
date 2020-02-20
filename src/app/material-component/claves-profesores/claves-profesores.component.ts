import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../../modelo/globales';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Profesor } from '../../modelo/profesor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Claveprofesor } from '../../modelo/claveprofesor';
import { ExcelClaveProfesor } from '../../modelo/excel-clave-profesor';
import { Estatus } from '../../modelo/estatus';

@Component({
  selector: 'app-claves-profesores',
  templateUrl: './claves-profesores.component.html',
  styleUrls: ['./claves-profesores.component.css']
})
export class ClavesProfesoresComponent implements OnInit {

  public form: FormGroup;
  estatus:Estatus={}

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<ExcelClaveProfesor>

  displayedColumns = ['claveProfesor', 'plantel', 'nombre', 'registrada', 'fecha'];

  indiceTab = 0;
  agregado: boolean
  claveprofesores: Claveprofesor[] = []
  excelClaveProfesores: ExcelClaveProfesor[] = []
  claveProfesor: Claveprofesor = {}

  listaPlanteles: string[] = [
    'Plantel 1',
    'Plantel 2',
    'Plantel 3',
    'Plantel 4',
    'Plantel 5',
    'Plantel 6',
    'Plantel 7',
    'Plantel 8',
    'Plantel 9',
    'Plantel 10',
    'Plantel 11',
    'Plantel 12',
    'Plantel 13',
    'Plantel 14',
    'Plantel 15',
    'Plantel 16',
    'Plantel 17',
    'Plantel 18',
    'Plantel 19',
    'Plantel 20',

  ];


  constructor(private fb: FormBuilder, private http: HttpClient, private breakpointObserver: BreakpointObserver) {

    //El siguiente breakpoint es para hacer responsiva cada fila
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['claveProfesor', 'plantel', 'nombre', 'registrada', 'fecha'] :
        ['claveProfesor', 'plantel', 'nombre', 'registrada', 'fecha'];
    });

  }

  ngOnInit() {


    this.form = this.fb.group({
      claveProfesor: [
        null,
        Validators.compose([
          Validators.required, /*CustomValidators.equal("123")*/

        ])
      ],
      planteles: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      nombre: [
        null,
        null,
      ]

    });

    //Iniciamos el request de las clasve profesores
    //ControladorClaveProfesor.java
    this.http.get<Claveprofesor[]>(Globales.urlBase + "/admin/claveprofesor").subscribe(
      claveprofesores => {
        this.claveprofesores = claveprofesores
        //LLenamos el excelclave profesor pero mantes nlimpiamos todo el excel
        this.excelClaveProfesores = []



        this.claveprofesores.forEach(claveprofesor => {
          let registrado = 'No'
          let fecha = ''
          if(claveprofesor.claveProfesor=='BINF21011'){
            console.log("Carelia "+JSON.stringify(claveprofesor));
          }
          
          if (claveprofesor.profesor != null) {
            registrado = "Sí"
            fecha = claveprofesor.profesor.fecha
          }
          //Anexamos al excel
          this.excelClaveProfesores.push(
            {
              claveProfesor: claveprofesor.claveProfesor,
              plantel: claveprofesor.plantel,
              nombre: claveprofesor.nombre,
              registrada: registrado,
              fecha: fecha
            }
          )

        })




        this.dataSource = new MatTableDataSource(this.excelClaveProfesores);

        //this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1200)


      }
    )

  }

  actualizarProfesor() {



    //La materias
   // console.log("La materias:" + this.form.get('materias').value)

   // let valores = "" + this.form.get('materias').value
  // let materiasSeleccionadas = valores.split(',')
  //  console.log("primera" + materiasSeleccionadas[0]);
  /*  materiasSeleccionadas.forEach(elemento => {
      this.materias.push({
       campo: this.form.get('areas').value,
       nombre: elemento
      });
   })*/

 //   console.log("Todas las materias ya generadas:" + JSON.stringify(this.materias));

  //this.profesor.materias=this.materias

    // Enviamos a http
    this.http.put(Globales.urlBase + "/profesor", this.claveProfesor).subscribe(
      estatus => {
        this.estatus = estatus
        console.log("Ya esta todo bien " + this.estatus.mensaje)

        Globales.profesor=this.estatus.profesor

        Swal.fire({
          icon: 'success',
          title: 'Actualización',
          text: this.estatus.mensaje,
          confirmButtonText:'Aceptar',
          footer: 'GEER'
        })


      }
    )

   // console.log("Registra profesor:" + JSON.stringify(this.profesor))
   // this.materias = []
  }

  obtenerProfesores() {
    this.http.get<Profesor[]>(Globales.urlBase + "/profesor").subscribe(
      profesores=> {
      //  this.profesores = profesores;
       // console.log("Profesores encontrados" + this.profesores.length)



       // this.dataSource = new MatTableDataSource(this.profesores);

        //this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1200)


      }
    )
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }


  onTabChanged($event) {
    let clickedIndex = $event.index;
    //Cambiamos al idncieTab al actual esto para recetearlo.
    this.indiceTab = clickedIndex
    console.log("cambio" + clickedIndex);
    if (clickedIndex == 0) {
      //this.obtenerProfesores()
    }

  }

}
