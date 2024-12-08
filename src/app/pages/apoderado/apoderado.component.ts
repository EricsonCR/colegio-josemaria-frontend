import { Component, OnInit } from '@angular/core';
import { Apoderado } from '../../classes/apoderado';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { ConceptoDetalle } from '../../classes/concepto-detalle';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApoderadoService } from '../../service/apoderado.service';

@Component({
  selector: 'app-apoderado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './apoderado.component.html',
  styleUrl: './apoderado.component.css'
})
export class ApoderadoComponent implements OnInit {

  ListaApoderados!: Apoderado[];
  ListaDocumentos!: ConceptoDetalle[];
  ListaRelacion!: ConceptoDetalle[];
  formApoderado = new FormGroup({
    "documento": new FormControl(),
    "numero": new FormControl(),
    "relacion": new FormControl(),
    "nombre": new FormControl(),
    "apellido": new FormControl(),
    "direccion": new FormControl(),
    "email": new FormControl(),
    "telefono": new FormControl(),
    "password": new FormControl(),
    "nacimiento": new FormControl()
  });

  constructor(
    private conceptoDetalleService: ConceptoDetalleService,
    private apoderadoService: ApoderadoService
  ) { }

  ngOnInit(): void {
    this.conceptoDetalleService.listar().subscribe({
      next: (result) => {
        this.ListaDocumentos = result.data.filter(x => x.id_concepto == 1);
        this.ListaRelacion = result.data.filter(x => x.id_concepto == 3);
      },
      error: (error) => { console.log(error); }
    });
    this.apoderadoService.listar().subscribe({
      next: (result) => { this.ListaApoderados = result.data; },
      error: (error) => { console.log(error); }
    });
  }

  crearApoderado(): void {
    this.apoderadoService.crear(this.formApoderado.value).subscribe({
      next: (result) => { this.ngOnInit(); document.getElementById("modalCrearClose")?.click(); },
      error: (error) => { console.log(error); }
    });
  }

  clearApoderado(): void {
    this.formApoderado.reset({
      documento: this.ListaDocumentos[0].nombre,
      relacion: this.ListaRelacion[0].nombre
    });
  }

}
