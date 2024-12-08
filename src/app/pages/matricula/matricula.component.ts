import { Component, NgModule, OnInit } from '@angular/core';
import { Matricula } from '../../classes/matricula';
import { MatriculaService } from '../../service/matricula.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { ConceptoDetalle } from '../../classes/concepto-detalle';
import { EstudianteService } from '../../service/estudiante.service';
import { Estudiante } from '../../classes/estudiante';
import { Apoderado } from '../../classes/apoderado';
import { ApoderadoService } from '../../service/apoderado.service';
import { EstudianteResponse } from '../../interfaces/estudiante-response';
import { RouterLink } from '@angular/router';

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

  ListaMatriculas: Matricula[] = [];
  ListaPeriodo: ConceptoDetalle[] = [];
  ListaNiveles: ConceptoDetalle[] = [];
  ListaGrados: ConceptoDetalle[] = [];
  ListaSeccion: ConceptoDetalle[] = [];
  ListaSituacion: ConceptoDetalle[] = [];

  txtDocumentoEstudiante: string = "";

  formMatricula = new FormGroup({
    id: new FormControl(),
    id_estudiante: new FormControl(),
    periodo: new FormControl(),
    nivel: new FormControl(),
    grado: new FormControl(),
    seccion: new FormControl(),
    situacion: new FormControl(),
    descripcion: new FormControl(),
  });

  constructor(
    private matriculaService: MatriculaService,
    private conceptosDetalleService: ConceptoDetalleService,
    private estudianteService: EstudianteService,
    private apoderadoService: ApoderadoService
  ) { }

  ngOnInit(): void {
    this.matriculaService.listar().subscribe({
      next: (result) => { this.ListaMatriculas = result.data; },
      error: (error) => { console.log(error); }
    });
    this.conceptosDetalleService.listar().subscribe({
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
    this.apoderadoService.buscarPorId(this.apoderado.id).subscribe({
      next: (result) => { this.apoderado = result.data[0]; },
      error: (error) => { console.log(error); }
    });
  }

  crearMatricula(): void {
    this.formMatricula.value.id_estudiante = this.estudiante.id;
    this.matriculaService.crear(this.formMatricula.value).subscribe({
      next: (result) => {
        this.ngOnInit();
        document.getElementById("modalCrearClose")?.click();
      },
      error: (error) => { console.log(error); }
    });
  }
}