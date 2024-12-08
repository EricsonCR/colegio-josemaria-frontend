import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstudianteResponse } from '../interfaces/estudiante-response';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private URL_API: string = "http://localhost:8080/api/estudiante";
  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<EstudianteResponse>(this.URL_API + "/listar");
  }
  crear(estudiante: any) {
    return this.httpClient.post<EstudianteResponse>(this.URL_API + "/crear", estudiante);
  }
  buscarPorNumero(data: string) {
    return this.httpClient.get<EstudianteResponse>(this.URL_API + "/buscarPorNumero/" + data);
  }
  buscarPorId(id: number) {
    return this.httpClient.get<EstudianteResponse>(this.URL_API + "/buscarPorId/" + id);
  }
}
