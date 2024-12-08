import { Routes } from '@angular/router';
import { ConceptoComponent } from './pages/concepto/concepto.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { MatriculaDetalleComponent } from './pages/matricula-detalle/matricula-detalle.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PagoRegistrarComponent } from './pages/pago-registrar/pago-registrar.component';

export const routes: Routes = [
    { path: "concepto", component: ConceptoComponent },
    { path: "apoderado", component: ApoderadoComponent },
    { path: "estudiante", component: EstudianteComponent },
    { path: "matricula", component: MatriculaComponent },
    { path: "matricula-detalle/:id", component: MatriculaDetalleComponent },
    { path: "pago", component: PagoComponent },
    { path: "pago-registrar", component: PagoRegistrarComponent }
];
