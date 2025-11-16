import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = environment.apiUrl + "/products";

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(this.API_URL + "/list");
  }

  add(data: FormData) {
    return this.http.post(this.API_URL, data);
  }

  update(id: number, data: FormData) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  bulkUpload(formData: FormData) {
    return this.http.post(this.API_URL + "/bulk-upload", formData);
  }
  downloadCSV() {
    return this.http.get(this.API_URL + "/export/csv", {
      responseType: 'blob'
    });
  }

  downloadExcel() {
    return this.http.get(this.API_URL + "/export/excel", {
      responseType: 'blob'
    });
  }

  getSummary() {
    return this.http.get(this.API_URL + "/summary");
  }
  getDashboardSummary() {
    return this.http.get(this.API_URL + "/dashboard-summary");
  }

  getProducts(page = 1, limit = 10) {
    return this.http.get(`${this.API_URL}/list?page=${page}&limit=${limit}`);
  }

}
