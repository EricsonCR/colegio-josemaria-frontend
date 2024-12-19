import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../classes/usuario';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  usuario: Usuario = new Usuario();
  formUsuario = new FormGroup({
    documento: new FormControl(),
    numero: new FormControl(),
    nombre: new FormControl(),
    apellido: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  signup() {
    this.authService.generated(this.formUsuario.value).subscribe({
      next: (result) => {
        console.log(result);
        if (result.status == "200") {
          this.alertaSuccess(result.message);
          this.router.navigate(["/login/validation"]);
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
      title: message,
      icon: "error",
      draggable: true
    });
  }

}
