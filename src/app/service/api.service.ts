import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverURL = `https://angular-luminar-employee-back-end.onrender.com`
  // serverURL = `http://localhost:3000`

  // 1) create object for behaviour subject
  sharedata = new BehaviorSubject(false)

  constructor(private http:HttpClient) { }

  // 2) function to update behavior subject
  updateData(data:any){
    this.sharedata.next(data)
  }

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

  deleteEmployeeAPI(id:string){
    return this.http.delete(`${this.serverURL}/employee/${id}`)
  }

  // get a particular 
  getAEmployee(id:any){
    return this.http.get(`${this.serverURL}/employee/${id}`)
  }

  //api to update employee details
  updateEmployee(id:any,body:any){
    return this.http.put(`${this.serverURL}/employee/${id}`,body)
  }

  //api to update admin details
  updateAdminDetailsAPI(body:any){
    return this.http.put(`${this.serverURL}/employee/1`,body)
  }
}
