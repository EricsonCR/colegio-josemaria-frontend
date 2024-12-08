import { Estudiante } from "../classes/estudiante";

export interface EstudianteResponse {
    data: Estudiante[],
    message: string,
    status: string
}
