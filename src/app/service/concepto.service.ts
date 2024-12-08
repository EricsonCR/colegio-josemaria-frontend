import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConceptoResponse } from '../interfaces/concepto-response';
import { Concepto } from '../classes/concepto';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  private URL_API = "http://localhost:8080/api/concepto";

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<ConceptoResponse>(this.URL_API + "/listar");
  }
  crear(concepto: Concepto) {
    return this.httpClient.post<ConceptoResponse>(this.URL_API + "/crear", concepto);
  }
}
