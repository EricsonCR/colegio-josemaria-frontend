import { Component, OnInit } from '@angular/core';
import { Matricula } from '../../classes/matricula';
import { MatriculaService } from '../../service/matricula.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { ConceptoDetalle } from '../../classes/concepto-detalle';
import { EstudianteService } from '../../service/estudiante.service';
import { Estudiante } from '../../classes/estudiante';
import { Apoderado } from '../../classes/apoderado';
import { ApoderadoService } from '../../service/apoderado.service';
import { EstudianteResponse } from '../../interfaces/estudiante-response';
import { RouterLink } from '@angular/router';
import { ConceptoService } from '../../service/concepto.service';
import { Concepto } from '../../classes/concepto';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [DatePipe, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css'
})
export class MatriculaComponent implements OnInit {

  estudiante: Estudiante = new Estudiante();
  apoderado: Apoderado = new Apoderado();

  ListaConceptos: Concepto[] = [];
  ListaMatriculas: Matricula[] = [];
  ListaPeriodo: ConceptoDetalle[] = [];
  ListaNiveles: ConceptoDetalle[] = [];
  ListaGrados: ConceptoDetalle[] = [];
  ListaSeccion: ConceptoDetalle[] = [];
  ListaSituacion: ConceptoDetalle[] = [];

  txtDocumentoEstudiante: string = "";
  idPeriodo: number = 0;
  idNivel: number = 0;
  idGrado: number = 0;
  idSeccion: number = 0;
  idSituacion: number = 0;

  formMatricula = new FormGroup({
    id_estudiante: new FormControl(""),
    periodo: new FormControl("", [Validators.required]),
    nivel: new FormControl("", [Validators.required]),
    grado: new FormControl("", [Validators.required]),
    seccion: new FormControl("", [Validators.required]),
    situacion: new FormControl("", [Validators.required]),
    descripcion: new FormControl()
  });

  constructor(
    private matriculaService: MatriculaService,
    private conceptoDetalleService: ConceptoDetalleService,
    private conceptoService: ConceptoService,
    private estudianteService: EstudianteService,
    private apoderadoService: ApoderadoService
  ) { }

  ngOnInit(): void {
    this.conceptoService.listar().subscribe({
      next: (result) => {
        this.ListaConceptos = result.data;
        this.idPeriodo = result.data.find(x => x.nombre == "PERIODO")?.id!;
        this.idNivel = result.data.find(x => x.nombre == "NIVEL")?.id!;
        this.idGrado = result.data.find(x => x.nombre == "GRADO")?.id!;
        this.idSeccion = result.data.find(x => x.nombre == "SECCION")?.id!;
        this.idSituacion = result.data.find(x => x.nombre == "SITUACION")?.id!;
        this.conceptoDetalleService.listar().subscribe({
          next: (result) => {
            this.ListaPeriodo = result.data.filter(x => x.id_concepto == this.idPeriodo);
            this.ListaNiveles = result.data.filter(x => x.id_concepto == this.idNivel);
            this.ListaGrados = result.data.filter(x => x.id_concepto == this.idGrado);
            this.ListaSeccion = result.data.filter(x => x.id_concepto == this.idSeccion);
            this.ListaSituacion = result.data.filter(x => x.id_concepto == this.idSituacion);
          }
        });
      },
      error: (error) => { console.log(error); }
    });
    this.matriculaService.listar().subscribe({
      next: (result) => { this.ListaMatriculas = result.data; },
      error: (error) => { console.log(error); }
    });
    this.conceptoDetalleService.listar().subscribe({
      next: (result) => {
        this.ListaPeriodo = result.data.filter(x => x.id_concepto == 5);
        this.ListaNiveles = result.data.filter(x => x.id_concepto == 6);
        this.ListaGrados = result.data.filter(x => x.id_concepto == 7);
        this.ListaSeccion = result.data.filter(x => x.id_concepto == 8);
        this.ListaSituacion = result.data.filter(x => x.id_concepto == 9);
      },
      error: (error) => { console.log(error); }
    });
  }

  clearMatricula(): void {
    this.txtDocumentoEstudiante = "";
    this.estudiante = new Estudiante();
    this.apoderado = new Apoderado();
    this.formMatricula.reset({
      periodo: this.ListaPeriodo[0].nombre,
      nivel: this.ListaNiveles[0].nombre,
      grado: this.ListaGrados[0].nombre,
      seccion: this.ListaSeccion[0].nombre,
      situacion: this.ListaSituacion[0].nombre
    });
  }

  buscarEstudiante(): void {
    if (this.txtDocumentoEstudiante != "") {
      this.estudianteService.buscarPorNumero(this.txtDocumentoEstudiante).subscribe({
        next: (result) => { this.llenarCampos(result); },
        error: (error) => { console.log(error); }
      });
    }
  }

  llenarCampos(result: EstudianteResponse): void {
    this.estudiante = result.data[0];
    this.apoderado.id = this.estudiante.id_apoderado;
    this.formMatricula.value.id_estudiante = this.estudiante.id.toString();
    this.apoderadoService.buscarPorId(this.apoderado.id).subscribe({
      next: (result) => { this.apoderado = result.data[0]; },
      error: (error) => { console.log(error); }
    });
  }

  crearMatricula(): void {
    Swal.fire({
      title: "Esta seguro que desea registrar matricula",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero registrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.formMatricula.value.id_estudiante = this.estudiante.id.toString();
        this.matriculaService.crear(this.formMatricula.value).subscribe({
          next: (result) => {
            if (result.status == "200") {
              this.alertaSuccess(result.message);
              this.ngOnInit();
              document.getElementById("modalCrearClose")?.click();
            } else {
              this.alertaError(result.message);
            }
          },
          error: (error) => { console.log(error); }
        });
      }
    });
  }

  alertaSuccess(message: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2500
    });
  }

  alertaError(message: string) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 2500
    });
  }
}