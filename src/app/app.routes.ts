import { Routes } from '@angular/router';
import { ConceptoComponent } from './pages/concepto/concepto.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { MatriculaDetalleComponent } from './pages/matricula-detalle/matricula-detalle.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PagoRegistrarComponent } from './pages/pago-registrar/pago-registrar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './helpers/auth.guard';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PagoDetalleComponent } from './pages/pago-detalle/pago-detalle.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LoginSinginComponent } from './pages/login-singin/login-singin.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { LoginValidationComponent } from './pages/login-validation/login-validation.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login/signin", pathMatch: "full" },
    {
        path: "login", component: LoginComponent,
        children: [
            { path: "signin", component: LoginSinginComponent },
            { path: "signup", component: LoginSignupComponent },
            { path: "validation", component: LoginValidationComponent }
        ]
    },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            { path: "usuario", component: UsuarioComponent },
            { path: "concepto", component: ConceptoComponent },
            { path: "apoderado", component: ApoderadoComponent },
            { path: "estudiante", component: EstudianteComponent },
            { path: "matricula", component: MatriculaComponent },
            { path: "matricula-detalle/:id", component: MatriculaDetalleComponent },
            { path: "pago", component: PagoComponent },
            { path: "pago-registrar", component: PagoRegistrarComponent },
            { path: "pago-detalle/:id", component: PagoDetalleComponent },
            { path: "reporte", component: ReportesComponent }
        ],
        canActivate: [authGuard]
    },
    { path: "**", component: NotFoundComponent }
];
