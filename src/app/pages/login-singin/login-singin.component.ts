import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../classes/usuario';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    email: new FormControl(),
    password: new FormControl()
  });

  signin() {
    this.authService.login(this.formUsuario.value).subscribe({
      next: (result) => {
        if (result.status == "200") {
          this.authService.clearToken("token");
          this.authService.setToken(result.message);
          this.router.navigate(["/dashboard"]);
        }
      },
      error: (error) => { console.log(error); }
    });
  }
}
