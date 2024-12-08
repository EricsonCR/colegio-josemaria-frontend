import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatriculaResponse } from '../interfaces/matricula-response';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private URL_API: string = "http://localhost:8080/api/matricula";

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<MatriculaResponse>(this.URL_API + "/listar");
  }

  crear(matricula: any) {
    return this.httpClient.post<MatriculaResponse>(this.URL_API + "/crear", matricula);
  }

  buscarPorId(id: number) {
    return this.httpClient.get<MatriculaResponse>(this.URL_API + "/buscarPorId/" + id);
  }

  buscarPorIdEstudiante(id: number) {
    return this.httpClient.get<MatriculaResponse>(this.URL_API + "/buscarPorIdEstudiante/" + id);
  }
}
