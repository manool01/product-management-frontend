import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.apiUrl + "/users";

  constructor(private http: HttpClient, private router: Router) { }

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  register(data: { email: string; password: string }) {
    return this.http.post(`${this.API_URL}/register`, data);
  }
}
