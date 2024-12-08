import { PagoDetalle } from "./pago-detalle";

export class Pago {
    id!: number;
    id_matricula!: number;
    monto!: number;
    metodo_pago!: string;
    numero_op!: string;
    url_voucher!: string;
    registro!: Date;
    actualizacion!: Date;
    estado!: boolean;
    pagoDetalle!: PagoDetalle[];
}
