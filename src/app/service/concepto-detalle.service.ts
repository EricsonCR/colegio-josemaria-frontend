import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConceptoDetalleResponse } from '../interfaces/concepto-detalle-response';
import { ConceptoDetalle } from '../classes/concepto-detalle';

@Injectable({
  providedIn: 'root'
})
export class ConceptoDetalleService {

  private URL_API = "http://localhost:8080/api/concepto-detalle";

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<ConceptoDetalleResponse>(this.URL_API + "/listar");
  }
  crear(conceptoDetalle: ConceptoDetalle) {
    return this.httpClient.post<ConceptoDetalleResponse>(this.URL_API + "/crear", conceptoDetalle);
  }
}
