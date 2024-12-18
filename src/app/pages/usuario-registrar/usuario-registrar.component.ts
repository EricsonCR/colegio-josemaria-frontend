import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  codigo: string = "";

  formUsuario = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    telefono: new FormControl(),
    nacimiento: new FormControl(),
    direccion: new FormControl(),
    code: new FormControl()
  });

  registarUsuario() {
    this.authService.generated(this.formUsuario.value).subscribe({
      next: (result) => {
        if (result.status == "200") {
          this.router.navigate(["/login/validar"]);
        }
      },
      error: (error) => { console.log(error); }
    });
  }

}
