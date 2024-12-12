import { Routes } from '@angular/router';
import { ConceptoComponent } from './pages/concepto/concepto.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { MatriculaDetalleComponent } from './pages/matricula-detalle/matricula-detalle.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PagoRegistrarComponent } from './pages/pago-registrar/pago-registrar.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioRegistrarComponent } from './pages/usuario-registrar/usuario-registrar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './helpers/auth.guard';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PagoDetalleComponent } from './pages/pago-detalle/pago-detalle.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "login/registrar", component: UsuarioRegistrarComponent },
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
            { path: "pago-detalle/:id", component: PagoDetalleComponent }
        ],
        canActivate: [authGuard]
    },
    { path: "**", component: NotFoundComponent }
];
