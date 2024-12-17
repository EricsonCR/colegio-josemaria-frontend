import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-usuario-registrar',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './usuario-registrar.component.html',
  styleUrl: './usuario-registrar.component.css'
})
export class UsuarioRegistrarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
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
    this.authService.register(this.formUsuario.value).subscribe({
      next: (result) => {
        console.log(result);
        this.authService.setToken(result.token);
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => { console.log(error); }
    });
  }

}
