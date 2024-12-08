import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../service/estudiante.service';
import { Estudiante } from '../../classes/estudiante';
import { ApoderadoService } from '../../service/apoderado.service';
import { Apoderado } from '../../classes/apoderado';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { ConceptoDetalle } from '../../classes/concepto-detalle';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit {

  ListaEstudiantes: Estudiante[] = [];
  ListaApoderados: Apoderado[] = [];
  ListaDocumentos: ConceptoDetalle[] = [];
  ListaGeneros: ConceptoDetalle[] = [];
  ListaRelacion: ConceptoDetalle[] = [];

  txtNumeroApoderado: string = "";

  apoderado: Apoderado = new Apoderado();
  estudiante: Estudiante = new Estudiante();

  formEstudiante = new FormGroup({
    documento: new FormControl(),
    numero: new FormControl(),
    genero: new FormControl(),
    id_apoderado: new FormControl(),
    nombre: new FormControl(),
    apellido: new FormControl(),
    direccion: new FormControl(),
    email: new FormControl(),
    telefono: new FormControl(),
    nacimiento: new FormControl()
  });

  constructor(
    private estudianteService: EstudianteService,
    private apoderadoService: ApoderadoService,
    private conceptoDetalleService: ConceptoDetalleService
  ) { }

  ngOnInit(): void {
    this.estudianteService.listar().subscribe({
      next: (result) => { this.ListaEstudiantes = result.data; },
      error: (error) => { }
    });
    this.apoderadoService.listar().subscribe({
      next: (result) => { this.ListaApoderados = result.data; },
      error: (error) => { }
    });
    this.conceptoDetalleService.listar().subscribe({
      next: (result) => {
        this.ListaDocumentos = result.data.filter(x => x.id_concepto == 1);
        this.ListaGeneros = result.data.filter(x => x.id_concepto == 4);
        this.ListaRelacion = result.data.filter(x => x.id_concepto == 3);
      }
    });
  }

  clearEstudiante(): void {
    this.apoderado = new Apoderado();
    this.txtNumeroApoderado = "";
    this.formEstudiante.reset({
      documento: this.ListaDocumentos[0].nombre,
      genero: this.ListaGeneros[0].nombre
    });
  }

  crearEstudiante(): void {
    this.formEstudiante.value.id_apoderado = this.apoderado.id;
    this.estudianteService.crear(this.formEstudiante.value).subscribe({
      next: (result) => { this.ngOnInit(); document.getElementById("modalCrearClose")?.click(); },
      error: (error) => { }
    });
  }

  buscarApoderado(): void {
    this.apoderado = this.ListaApoderados.find(x => x.numero == this.txtNumeroApoderado)!;
  }
}
