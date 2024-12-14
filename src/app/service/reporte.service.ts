import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoService } from './pago.service';
import { PagoDetalleService } from './pago-detalle.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Pago } from '../classes/pago';
import { PagoDetalle } from '../classes/pago-detalle';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  generarPDF(pago: Pago, pagoDetalle: PagoDetalle[]) {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(24);
    doc.text('Comprobante de Pago', 60, 10);

    //Subtitulo
    doc.setFontSize(18);
    doc.text('Datos de Pago', 10, 20);

    // Información del Pago
    doc.setFontSize(12);
    doc.text("Numero de Pago:", 20, 30); doc.text(pago.id.toString(), 80, 30);
    doc.text("Numero de Matricula:", 20, 40); doc.text(pago.id_matricula.toString(), 80, 40);
    doc.text("Metodo de Pago:", 20, 50); doc.text(pago.metodo_pago.toString(), 80, 50);
    doc.text("Numero de OP:", 20, 60); doc.text(pago.numero_op.toString(), 80, 60);
    doc.text("Fecha de Pago:", 20, 70); doc.text(formatDate(pago.registro, 'dd-MM-yyyy', 'en-US').toString(), 80, 70);


    /* doc.text(`Número de Pago: ${pago.id}`, 20, 30);
    doc.text(`Numero Matricula: ${pago.id_matricula}`, 20, 40);
    doc.text(`Metodo Pago: ${pago.metodo_pago}`, 20, 50);
    doc.text(`Numero OP: ${pago.numero_op}`, 20, 60);
    doc.text(`Fecha de Pago: ${formatDate(pago.registro, 'dd-MM-yyyy', 'en-US')}`, 20, 70); */

    // Detalles de Pago
    doc.setFontSize(18);
    doc.text('Detalles:', 10, 80);

    // Crear tabla para detalles
    const tableColumn = ['ID', 'Concepto', 'Monto'];
    const tableRows = pagoDetalle.map(detalle => [
      detalle.id.toString(),
      detalle.concepto,
      `S/ ${detalle.monto.toFixed(2)}`  // Mostrar el monto con 2 decimales
    ]);
    // Agregar tabla al PDF
    autoTable(doc, {
      startY: 85,
      margin: 10,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',  // Puedes usar otros temas como 'striped' o 'plain'
      headStyles: {
        fillColor: [22, 160, 133], // Color de fondo para el encabezado de la tabla
        textColor: [255, 255, 255] // Color de texto del encabezado
      },
      styles: {
        cellPadding: 2,
        fontSize: 12
      }
    });

    // Descargar el PDF
    doc.save('reporte_pago.pdf');
  }

}
