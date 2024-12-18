import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-validated',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './usuario-validated.component.html',
  styleUrl: './usuario-validated.component.css'
})
export class UsuarioValidatedComponent {

  codigo: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  validarCodigo() {
    this.authService.register(this.codigo).subscribe({
      next: (result) => {
        if (result.status == "200") {
          this.authService.setToken(result.message);
          this.router.navigate(["/dashboard"]);
        }
      },
      error: (error) => { console.log(error); }
    });
  }

}
