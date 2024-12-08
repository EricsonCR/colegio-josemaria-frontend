import { Concepto } from "../classes/concepto";


export interface ConceptoResponse {
    data: Concepto[],
    message: string,
    status: string
}
