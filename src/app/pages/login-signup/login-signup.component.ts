import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../classes/usuario';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2'
import { ConceptoDetalleService } from '../../service/concepto-detalle.service';
import { ConceptoService } from '../../service/concepto.service';
import { ConceptoDetalle } from '../../classes/concepto-detalle';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent implements OnInit, AfterViewInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private conceptoDetalleService: ConceptoDetalleService,
    private conceptoService: ConceptoService
  ) { }

  ngAfterViewInit(): void {
    this.conceptoService.listar().subscribe({
      next: (result) => {
        this.idDocumento = result.data.find(x => x.nombre == "DOCUMENTO")?.id!;
        this.conceptoDetalleService.listar().subscribe({
          next: (result) => {
            this.ListaDocumentos = result.data.filter(x => x.id_concepto == this.idDocumento);
            this.resetvalues();
          },
          error: (error) => { }
        });
      },
      error: (error) => { console.log(error); }
    });
  }

  ListaDocumentos: ConceptoDetalle[] = [];
  idDocumento: number = 0;

  ngOnInit(): void {

  }

  usuario: Usuario = new Usuario();
  formUsuario = new FormGroup({
    documento: new FormControl("", [Validators.required]),
    numero: new FormControl("", [Validators.required, Validators.maxLength(8)]),
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  resetvalues() {
    this.formUsuario.reset({
      documento: this.ListaDocumentos[0].nombre,
    });
  }

  signup() {
    Swal.fire({
      title: "Se enviara un mensaje a correo",
      text: "Revisar el codigo enviado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero registrarme"
    }).then((result) => {
      if (result.isConfirmed) {
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
