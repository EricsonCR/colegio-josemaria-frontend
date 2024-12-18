import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

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
          this.authService.clearToken("token");
          this.authService.setToken(result.message);
          this.router.navigate(["/dashboard"]);
        }
      },
      error: (error) => { console.log(error); }
    });
  }
}
