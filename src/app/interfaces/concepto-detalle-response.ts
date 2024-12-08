import { ConceptoDetalle } from "../classes/concepto-detalle";

export interface ConceptoDetalleResponse {
    data: ConceptoDetalle[],
    message: string,
    status: string
}
