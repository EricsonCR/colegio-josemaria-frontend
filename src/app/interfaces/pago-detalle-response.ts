import { PagoDetalle } from "../classes/pago-detalle";

export interface PagoDetalleResponse {
    data: PagoDetalle[];
    message: string;
    status: string;
}
