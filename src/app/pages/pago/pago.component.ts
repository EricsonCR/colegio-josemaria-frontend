import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PagoService } from '../../service/pago.service';
import { Pago } from '../../classes/pago';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {

  ListaPagos: Pago[] = [];

  constructor(
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    this.pagoService.listar().subscribe({
      next: (result) => { this.ListaPagos = result.data; },
      error: (error) => { console.log(error); }
    });
  }
}

