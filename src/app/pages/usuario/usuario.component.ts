import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { ConceptoDetalle } from '../../classes/concepto-detalle';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { ConceptoService } from '../../service/concepto.service';
import { Concepto } from '../../classes/concepto';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  constructor(
    private usuarioService: UsuarioService,
    private conceptoDetalleService: ConceptoDetalleService,
    private conceptoService: ConceptoService
  ) { }

  ListaConceptos: Concepto[] = [];
  ListaUsuarios: Usuario[] = [];
  ListaDocumentos: ConceptoDetalle[] = [];
  ListaGeneros: ConceptoDetalle[] = [];
  usuario: Usuario = new Usuario();
  idDocumento: number = 0;
  idGenero: number = 0;

  formUsuario = new FormGroup({
    documento: new FormControl("", Validators.required),
    numero: new FormControl("", [Validators.required, Validators.maxLength(8)]),
    genero: new FormControl("", Validators.required),
    nombre: new FormControl("", Validators.required),
    apellido: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    telefono: new FormControl("", [Validators.required, Validators.maxLength(9)]),
    nacimiento: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
    this.conceptoService.listar().subscribe({
      next: (result) => {
        this.ListaConceptos = result.data;
        this.idDocumento = result.data.find(x => x.nombre == "DOCUMENTO")?.id!;
        this.idGenero = result.data.find(x => x.nombre == "GENERO")?.id!;
        this.conceptoDetalleService.listar().subscribe({
          next: (result) => {
            this.ListaDocumentos = result.data.filter(x => x.id_concepto == this.idDocumento);
            this.ListaGeneros = result.data.filter(x => x.id_concepto == this.idGenero);
          }
        });
      },
      error: (error) => { console.log(error); }
    });
    this.usuarioService.listar().subscribe({
      next: (result) => { this.ListaUsuarios = result.data; },
      error: (error) => { console.log(error); }
    });

  }

  clearUsuario(): void {
    this.formUsuario.reset({
      documento: this.ListaDocumentos[0].nombre,
      genero: this.ListaGeneros[0].nombre
    });
  }

  crearUsuario(): void {
    this.usuarioService.registrar(this.formUsuario.value).subscribe({
      next: (result) => {
        if (result.status == "200") {
          this.alertaSuccess(result.message);
          this.ngOnInit();
          document.getElementById("modalCrearClose")?.click();
        } else {
          this.alertaError(result.message);
        }
      },
      error: (error) => { }
    });
  }

  alertaSuccess(message: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2500
    });
  }

  alertaError(message: string) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 2500
    });
  }

}
