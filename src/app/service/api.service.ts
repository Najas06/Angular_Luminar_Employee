import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverURL = `http://localhost:3000`

  constructor(private http:HttpClient) { }

  // api to login
  loginAPI () {
    return this.http.get(`${this.serverURL}/employee/1`)
  }

  //api to add employee
  addEmployeeAPI(reqBody:any){
    return this.http.post(`${this.serverURL}/employee`,reqBody)
  }

  //api to get all employee details
  getAllEmployeeAPI(){
    return this.http.get(`${this.serverURL}/employee`)
  }
}
