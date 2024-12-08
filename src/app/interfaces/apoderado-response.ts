import { Apoderado } from "../classes/apoderado";

export interface ApoderadoResponse {
    data: Apoderado[],
    message: string,
    status: string
}
