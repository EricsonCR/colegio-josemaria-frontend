import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { ConceptoDetalle } from '../../classes/concepto-detalle';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';

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
    private conceptoDetalleService: ConceptoDetalleService
  ) { }

  ListaUsuarios: Usuario[] = [];
  ListaDocumentos: ConceptoDetalle[] = [];
  ListaGeneros: ConceptoDetalle[] = [];
  ListaRelacion: ConceptoDetalle[] = [];
  usuario: Usuario = new Usuario();

  formUsuario = new FormGroup({
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

  ngOnInit(): void {
    this.usuarioService.listar().subscribe({
      next: (result) => { this.ListaUsuarios = result.data; },
      error: (error) => { console.log(error); }
    });
    this.conceptoDetalleService.listar().subscribe({
      next: (result) => {
        this.ListaDocumentos = result.data.filter(x => x.id_concepto == 1);
        this.ListaGeneros = result.data.filter(x => x.id_concepto == 4);
        this.ListaRelacion = result.data.filter(x => x.id_concepto == 3);
      }
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
      next: (result) => { this.ngOnInit(); document.getElementById("modalCrearClose")?.click(); },
      error: (error) => { }
    });
  }

}
