import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apoderado } from '../classes/apoderado';
import { ApoderadoResponse } from '../interfaces/apoderado-response';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {

  private URL_API: string = "http://localhost:8080/api/apoderado";

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<ApoderadoResponse>(this.URL_API + "/listar");
  }
  crear(apoderado: any) {
    return this.httpClient.post<ApoderadoResponse>(this.URL_API + "/crear", apoderado);
  }
  buscarPorId(id: number) {
    return this.httpClient.get<ApoderadoResponse>(this.URL_API + "/buscarPorId/" + id);
  }
}
