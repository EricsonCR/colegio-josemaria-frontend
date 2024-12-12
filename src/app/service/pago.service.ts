import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pago } from '../classes/pago';
import { PagoResponse } from '../interfaces/pago-response';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private URL_API: string = "http://localhost:8080/api/pago"

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<PagoResponse>(this.URL_API + "/listar");
  }

  crear(pago: any) {
    return this.httpClient.post<PagoResponse>(this.URL_API + "/crear", pago);
  }

  buscar(id: number) {
    return this.httpClient.get<PagoResponse>(this.URL_API + "/buscarPorId/" + id);
  }
}
