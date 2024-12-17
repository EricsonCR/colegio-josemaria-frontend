import { Component } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  usuario: Usuario = new Usuario();
  formUsuario = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  login() {
    this.authService.login(this.formUsuario.value).subscribe({
      next: (result) => {
        this.authService.setToken(result.token);
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => { console.log(error); }
    });
  }
}
