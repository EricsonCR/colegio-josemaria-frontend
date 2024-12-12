import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoDetalleResponse } from '../interfaces/pago-detalle-response';

@Injectable({
  providedIn: 'root'
})
export class PagoDetalleService {

  API_URL: string = "http://localhost:8080/api/pago_detalle";

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<PagoDetalleResponse>(this.API_URL + "/listar");
  }

  listarPorIdPago(id: number) {
    return this.httpClient.get<PagoDetalleResponse>(this.API_URL + "/listarPorIdPago/" + id);
  }
}
