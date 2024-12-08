import { Component, OnInit } from '@angular/core';
import { ConceptoService } from '../../service/concepto.service';
import { DatePipe } from '@angular/common';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { FormsModule } from '@angular/forms';
import { Concepto } from '../../classes/concepto';
import { Router } from '@angular/router';
import { ConceptoDetalle } from '../../classes/concepto-detalle';

@Component({
  selector: 'app-concepto',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './concepto.component.html',
  styleUrl: './concepto.component.css'
})
export class ConceptoComponent implements OnInit {

  ListaConceptos: Concepto[] = [];
  ListaConceptoDetalle: ConceptoDetalle[] = [];
  concepto: Concepto = new Concepto();
  conceptoDetalle: ConceptoDetalle = new ConceptoDetalle();
  txtConcepto: string = "";
  txtConceptoDetalle: string = "";
  idConcepto: number = 1;
  contador: number = 0;

  constructor(
    private conceptoService: ConceptoService,
    private conceptoDetalleService: ConceptoDetalleService
  ) { }

  ngOnInit(): void {
    this.conceptoService.listar().subscribe({
      next: (result) => { this.ListaConceptos = result.data; },
      error: (error) => { }
    });
    this.conceptoDetalleService.listar().subscribe({
      next: (result) => { this.ListaConceptoDetalle = result.data; },
      error: (error) => { }
    });
  }

  buscarNombreConcepto(id: number): string {
    return this.ListaConceptos.find((x) => x.id == id)?.nombre!;
  }

  agregarConcepto(): void {
    this.concepto.nombre = this.txtConcepto;
    this.txtConcepto = "";
    this.conceptoService.crear(this.concepto).subscribe({
      next: (result) => { this.ngOnInit(); },
      error: (error) => { console.log(error); }
    });
  }

  agregarConceptoDetalle(): void {
    console.log(this.ListaConceptos.find(x => x.id == this.idConcepto)?.nombre);
    this.conceptoDetalle.id_concepto = this.idConcepto;
    this.conceptoDetalle.nombre = this.txtConceptoDetalle;
    this.idConcepto = 1;
    this.txtConceptoDetalle = "";
    this.conceptoDetalleService.crear(this.conceptoDetalle).subscribe({
      next: (result) => { this.ngOnInit(); },
      error: (error) => { console.log(error); }
    });
  }
}
