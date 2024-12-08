import { Pago } from "../classes/pago";

export interface PagoResponse {
    data: Pago[];
    mesasge: string;
    status: string;
}
