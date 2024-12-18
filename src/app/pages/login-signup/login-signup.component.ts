import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../classes/usuario';
import { AuthService } from '../../service/auth.service';

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
        if (result.status == "200") {
          this.router.navigate(["/login/validation"]);
        }
      },
      error: (error) => { console.log(error); }
    });
  }

}
