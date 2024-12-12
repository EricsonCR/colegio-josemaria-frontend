import { Component } from '@angular/core';
import { Pago } from '../../classes/pago';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PagoDetalle } from '../../classes/pago-detalle';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

}
