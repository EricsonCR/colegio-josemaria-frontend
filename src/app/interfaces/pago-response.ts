import { Pago } from "../classes/pago";

export interface PagoResponse {
    data: Pago[];
    message: string;
    status: string;
}
