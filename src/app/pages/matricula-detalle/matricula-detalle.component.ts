import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatriculaDetalleService } from '../../service/matricula-detalle.service';
import { MatriculaDetalle } from '../../classes/matricula-detalle';
import { Matricula } from '../../classes/matricula';
import { Estudiante } from '../../classes/estudiante';
import { Apoderado } from '../../classes/apoderado';
import { MatriculaService } from '../../service/matricula.service';
import { DatePipe } from '@angular/common';
import { EstudianteService } from '../../service/estudiante.service';
import { ApoderadoService } from '../../service/apoderado.service';

@Component({
  selector: 'app-matricula-detalle',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './matricula-detalle.component.html',
  styleUrl: './matricula-detalle.component.css'
})
export class MatriculaDetalleComponent {

  idMatricula: number = 0;
  listaMatriculaDetalle: MatriculaDetalle[] = [];
  matricula: Matricula = new Matricula();
  estudiante: Estudiante = new Estudiante();
  apoderado: Apoderado = new Apoderado();

  constructor(
    private activatedRoute: ActivatedRoute,
    private matriculaDetalleService: MatriculaDetalleService,
    private matriculaService: MatriculaService,
    private estudianteService: EstudianteService,
    private apoderadoService: ApoderadoService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idMatricula = params["id"];
      this.buscarListaMatricualDetalle(this.idMatricula);
      this.buscarMatricula(this.idMatricula);
    });
  }

  buscarListaMatricualDetalle(id: number) {
    this.matriculaDetalleService.listarPorIdMatricula(this.idMatricula).subscribe({
      next: (result) => { this.listaMatriculaDetalle = result.data; },
      error: (error) => { console.log(error); }
    });
  }

  buscarMatricula(id: number) {
    this.matriculaService.buscarPorId(id).subscribe({
      next: (result) => {
        this.matricula = result.data[0];
        this.buscarEstudiante(this.matricula.id_estudiante);
      },
      error: (error) => { console.log(error); }
    });
  }

  buscarEstudiante(id: number) {
    this.estudianteService.buscarPorId(id).subscribe({
      next: (result) => {
        this.estudiante = result.data[0];
        this.buscarApoderado(this.estudiante.id_apoderado);
      },
      error: (error) => { console.log(error); }
    });
  }

  buscarApoderado(id: number) {
    this.apoderadoService.buscarPorId(id).subscribe({
      next: (result) => { this.apoderado = result.data[0]; },
      error: (error) => { }
    });
  }

}
