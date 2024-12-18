import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../classes/usuario';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-singin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-singin.component.html',
  styleUrl: './login-singin.component.css'
})
export class LoginSinginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  usuario: Usuario = new Usuario();
  formUsuario = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  signin() {
    this.authService.login(this.formUsuario.value).subscribe({
      next: (result) => {
        if (result.status == "200") {
          console.log(result.data);
          this.authService.setToken("");
          this.authService.setToken(result.data.token);
          this.authService.setUser(result.data.email);
          this.alertaSuccess(result.message);
          this.router.navigate(["/dashboard"]);
        } else {
          this.alertaError(result.message);
        }
      },
      error: (error) => { console.log(error); }
    });
  }

  alertaSuccess(message: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  alertaError(message: string) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
