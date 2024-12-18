import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  nombre: string = "";
  email: string = "";
  mensaje: string = "";

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioService.buscarPorEmail(localStorage.getItem("user") ?? "").subscribe({
      next: (result) => {
        if (result.status == "200") {
          this.nombre = result.data[0].nombre + " " + result.data[0].apellido;
          this.email = result.data[0].email;
          this.mensaje = "Bienvenido " + this.nombre;
        }
      },
      error: (error) => { }
    });
  }



  editprofile() {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.authService.setToken("");
    this.authService.setUser("");
    this.router.navigate(["/login/signin"]);
  }

}
