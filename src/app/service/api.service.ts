import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverURL = `http://localhost:3000`

  constructor(private http:HttpClient) { }

  loginAPI () {
    return this.http.get(`${this.serverURL}/employee/1`)
  }
}
