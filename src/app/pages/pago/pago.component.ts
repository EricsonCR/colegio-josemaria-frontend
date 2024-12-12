import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PagoService } from '../../service/pago.service';
import { Pago } from '../../classes/pago';
import { DatePipe } from '@angular/common';
import { ReporteService } from '../../service/reporte.service';
import { PagoDetalleService } from '../../service/pago-detalle.service';
import { PagoDetalle } from '../../classes/pago-detalle';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {

  ListaPagos: Pago[] = [];
  ListaPagoDetalle: PagoDetalle[] = [];

  constructor(
    private pagoService: PagoService,
    private pagoDetalleService: PagoDetalleService,
    private reporteService: ReporteService
  ) { }

  ngOnInit(): void {
    this.buscarListaPagos();
  }

  generarPDF(pago: Pago) {
    this.buscarListaPagoDetalle(pago);
  }

  buscarListaPagos() {
    this.pagoService.listar().subscribe({
      next: (result) => { this.ListaPagos = result.data; },
      error: (error) => { console.log(error); }
    });
  }

  buscarListaPagoDetalle(pago: Pago) {
    this.pagoDetalleService.listarPorIdPago(pago.id).subscribe({
      next: (result) => {
        this.ListaPagoDetalle = result.data;
        if (this.ListaPagoDetalle.length) {
          this.reporteService.generarPDF(pago, this.ListaPagoDetalle);
        }
      },
      error: (error) => { console.log(error); }
    });
  }
}