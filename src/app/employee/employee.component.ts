import { Component, OnInit } from '@angular/core';
import { EmpModel } from '../employee.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee: EmpModel[] = []

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllEmployee()
  }
  getAllEmployee() {
    this.api.getAllEmployeeAPI().subscribe({
      next: (res: any) => {
        this.allEmployee = res
      },
      error: (err: any) => {
        console.log(err);
        
      }
    })
  }
}
