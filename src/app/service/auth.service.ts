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

  login(usuario: any): Observable<any> {
    return this.httpClient.post(this.API_URL + "/login", usuario, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const token = response.headers.get("Authorization")!.replace("Bearer ", "");
      localStorage.setItem("token", token);
      return response.body;
    }));
  }

  getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem("token");
    }
    return "";
  }

  removeItem(data: string) {
    localStorage.removeItem(data);
  }
}
