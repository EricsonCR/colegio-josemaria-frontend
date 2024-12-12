import { Component } from '@angular/core';
import { Pago } from '../../classes/pago';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PagoService } from '../../service/pago.service';
import { PagoDetalleService } from '../../service/pago-detalle.service';
import { DatePipe } from '@angular/common';
import { PagoDetalle } from '../../classes/pago-detalle';

@Component({
  selector: 'app-pago-detalle',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './pago-detalle.component.html',
  styleUrl: './pago-detalle.component.css'
})
export class PagoDetalleComponent {

  idPago: number = 0;
  pago: Pago = new Pago();
  ListaPagoDetalle: PagoDetalle[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagoService: PagoService,
    private pagoDetalleService: PagoDetalleService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idPago = params["id"];
      this.buscarPago(this.idPago);
      this.listarPagoDetalle(this.idPago);
    });
  }
  buscarPago(id: number) {
    this.pagoService.buscar(id).subscribe({
      next: (result) => { this.pago = result.data[0]; },
    });
  }
  listarPagoDetalle(id: number) {
    this.pagoDetalleService.listarPorIdPago(id).subscribe({
      next: (result) => { this.ListaPagoDetalle = result.data; },
      error: (error) => { console.log(error); }
    });
  }

}
