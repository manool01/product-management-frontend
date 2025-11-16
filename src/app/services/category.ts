import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL = environment.apiUrl + "/categories";

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(this.API_URL);
  }

  add(data: { name: string }) {
    return this.http.post(this.API_URL, data);
  }

  update(id: number, data: { name: string }) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  getCategories(page = 1, limit = 10) {
    return this.http.get(`${this.API_URL}/list?page=${page}&limit=${limit}`);
  }


}
