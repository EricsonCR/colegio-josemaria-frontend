import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL: string = "http://localhost:8080/api/usuario";
  constructor(
    private httpClient: HttpClient
  ) { }

  listar(){
    return this.httpClient.get<any>(this.API_URL+"/listar");
  }

  registrar(usuario: any) {
    return this.httpClient.post<any>(this.API_URL + "/registrar", usuario);
  }
}
