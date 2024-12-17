import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = "http://localhost:8080/auth";
  constructor(
    private httpClient: HttpClient
  ) { }

  login(usuario: any) {
    return this.httpClient.post<any>(this.API_URL + "/login", usuario);
  }

  register(usuario: any) {
    return this.httpClient.post<any>(this.API_URL + "/register", usuario);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem("token");
    }
    return "";
  }

  clearToken(token: string) {
    localStorage.removeItem(token);
  }
}
