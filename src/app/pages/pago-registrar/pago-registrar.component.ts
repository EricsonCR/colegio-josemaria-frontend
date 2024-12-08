import { DatePipe } from '@angular/common';
import { booleanAttribute, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../../service/estudiante.service';
import { ApoderadoService } from '../../service/apoderado.service';
import { MatriculaService } from '../../service/matricula.service';
import { Matricula } from '../../classes/matricula';
import { Estudiante } from '../../classes/estudiante';
import { Apoderado } from '../../classes/apoderado';
import { MatriculaDetalleService } from '../../service/matricula-detalle.service';
import { MatriculaDetalle } from '../../classes/matricula-detalle';
import { PagoDetalle } from '../../classes/pago-detalle';
import { Pago } from '../../classes/pago';
import { ConceptoDetalle } from '../../classes/concepto-detalle';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { PagoService } from '../../service/pago.service';

@Component({
  selector: 'app-pago-registrar',
  standalone: true,
  imports: [DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './pago-registrar.component.html',
  styleUrl: './pago-registrar.component.css'
})
export class PagoRegistrarComponent {

  FechaActual = new Date();
  txtDniMatricula: string = "";
  matricula: Matricula = new Matricula();
  estudiante: Estudiante = new Estudiante();
  apoderado: Apoderado = new Apoderado();
  ListaMatriculaDetalle: MatriculaDetalle[] = [];
  listaCheckbox: any[] = [];
  ListaPagoDetalle: PagoDetalle[] = [];
  textButtonPago: string = "";
  estadoButtonPagar: boolean = true;
  pago: Pago = new Pago();
  ListaMetodosPago: ConceptoDetalle[] = [];

  constructor(
    private conceptoDetalleService: ConceptoDetalleService,
    private estudianteService: EstudianteService,
    private apoderadoService: ApoderadoService,
    private matriculaService: MatriculaService,
    private matriculaDetalleService: MatriculaDetalleService,
    private pagoService: PagoService
  ) { }

  ngOnInit() {
    this.limpiarDatos();
    this.conceptoDetalleService.listar().subscribe({
      next: (result) => {
        this.ListaMetodosPago = result.data.filter(x => x.id_concepto == 10);
        this.pago.metodo_pago = this.ListaMetodosPago[0].nombre;
      },
      error: (error) => { console.log(error); }
    });
  }

  buscarMatricula() {
    this.matriculaService.buscarPorIdEstudiante(parseInt(this.txtDniMatricula)).subscribe({
      next: (result) => {
        this.matricula = result.data[0];
        this.buscarEstudiante(this.matricula.id_estudiante);
        this.buscarMatriculaDetalle(this.matricula.id);
      },
      error: (error) => { console.log(error); }
    });
  }

  buscarMatriculaDetalle(id: number) {
    this.matriculaDetalleService.listarPorIdMatricula(id).subscribe({
      next: (result) => {
        this.ListaMatriculaDetalle = result.data.filter(x => x.estado == "PENDIENTE");
        this.ListaMatriculaDetalle.forEach(item => {
          this.listaCheckbox.push({ selected: false });
        });
      },
      error: (error) => { console.log(error); }
    });
  }

  buscarEstudiante(id_estudiante: number) {
    this.estudianteService.buscarPorId(id_estudiante).subscribe({
      next: (result) => {
        this.estudiante = result.data[0];
        this.buscarApoderado(this.estudiante.id_apoderado);
      },
      error: (error) => { console.log(error); }
    });
  }

  buscarApoderado(id_apoderado: number) {
    this.apoderadoService.buscarPorId(id_apoderado).subscribe({
      next: (result) => { this.apoderado = result.data[0]; },
      error: (error) => { console.log(error); }
    });
  }

  obtenerEstado(data: MatriculaDetalle, estado: boolean) {

    if (estado) {
      this.ListaPagoDetalle.push({
        concepto: data.descripcion,
        id: 0,
        id_pago: 0,
        id_matricula_detalle: data.id,
        monto: data.monto,
        estado: ""
      });
    } else {
      const index = this.ListaPagoDetalle.findIndex(x => x.id_matricula_detalle == data.id);
      if (index !== -1) {
        this.ListaPagoDetalle.splice(index, 1);
      }
    }
    this.pago.monto = 0;
    this.ListaPagoDetalle.forEach(item => {
      this.pago.monto += item.monto;
    });
    if (this.pago.monto > 0) {
      this.textButtonPago = "S/. " + this.pago.monto.toString() + " - ";
      this.estadoButtonPagar = false;
    } else {
      this.textButtonPago = "";
      this.estadoButtonPagar = true;
    }
  }

  registrarPago() {
    this.pago.pagoDetalle = this.ListaPagoDetalle;
    this.pago.id_matricula = this.matricula.id;
    this.pagoService.crear(this.pago).subscribe({
      next: (result) => {
        console.log(result.data);
        this.ngOnInit();
      },
      error: (error) => { console.log(error); }
    });
  }

  limpiarDatos() {
    this.matricula = new Matricula();
    this.estudiante = new Estudiante();
    this.apoderado = new Apoderado();
    this.pago = new Pago();
    this.ListaPagoDetalle = [];
    this.ListaMatriculaDetalle = [];
    this.textButtonPago = "";
    this.txtDniMatricula = "";
    this.estadoButtonPagar = true;
    this.listaCheckbox = [];
  }
}
