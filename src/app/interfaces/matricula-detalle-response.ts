import { MatriculaDetalle } from "../classes/matricula-detalle";

export interface MatriculaDetalleResponse {
    data: MatriculaDetalle[];
    message: string;
    status: string;
}
