import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatriculaDetalleResponse } from '../interfaces/matricula-detalle-response';

@Injectable({
  providedIn: 'root'
})
export class MatriculaDetalleService {
  private URL_API: string = "http://localhost:8080/api/matricula_detalle";

  constructor(private httpClient: HttpClient) { }

  listarPorIdMatricula(id: number) {
    return this.httpClient.get<MatriculaDetalleResponse>(this.URL_API + "/listarPorIdMatricula/" + id);
  }
}
