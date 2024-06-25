import { Component } from '@angular/core';
import { EmpModel } from '../employee.model';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  employeeDetails:EmpModel={}

  constructor (private api:ApiService, private route:Router){}

  Cancel(){
    this.employeeDetails={}
  }
  addUser(){
    this.api.addEmployeeAPI(this.employeeDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title:"wow",
          text:"Employee Added Successfully",
          icon:"success"
        })
        this.route.navigateByUrl("/employee")
      },
      error:(err:any)=>{
        console.log(err);
        Swal.fire({
          title:"Oops",
          text:"Something Went Wrong",
          icon:"error"
        })
        this.employeeDetails={}
      }
    })
  }
}
