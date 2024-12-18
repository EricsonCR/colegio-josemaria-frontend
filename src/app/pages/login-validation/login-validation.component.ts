import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-validation',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-validation.component.html',
  styleUrl: './login-validation.component.css'
})
export class LoginValidationComponent {
  codigo: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  validation() {
    this.authService.register(this.codigo).subscribe({
      next: (result) => {
        if (result.status == "200") {
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
      title: message,
      icon: "error",
      draggable: true
    });
  }
}
