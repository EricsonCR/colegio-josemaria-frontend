import { Matricula } from "../classes/matricula";

export interface MatriculaResponse {
    data: Matricula[];
    message: string;
    status: string;
}
