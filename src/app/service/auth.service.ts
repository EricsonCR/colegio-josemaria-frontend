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

  generated(usuario: any) {
    return this.httpClient.post<any>(this.API_URL + "/generated", usuario);
  }

  register(code: string) {
    return this.httpClient.post<any>(this.API_URL + "/register", code);
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

  setUser(user: string) {
    localStorage.setItem("user", user);
  }

  getUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem("user");
    }
    return "";
  }

  removeToken() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }
  removeUser() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
  }
}
