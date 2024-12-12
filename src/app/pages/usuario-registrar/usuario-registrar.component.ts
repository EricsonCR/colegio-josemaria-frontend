import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-registrar',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './usuario-registrar.component.html',
  styleUrl: './usuario-registrar.component.css'
})
export class UsuarioRegistrarComponent {
  constructor(
    private usuarioService: UsuarioService
  ) { }

  formUsuario = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    telefono: new FormControl(),
    nacimiento: new FormControl(),
    direccion: new FormControl()
  });

  registarUsuario() {
    console.log(this.formUsuario.value);
    this.usuarioService.registrar(this.formUsuario.value).subscribe({
      next: (result) => { console.log(result); },
      error: (error) => { console.log(error); }
    });
  }

}
