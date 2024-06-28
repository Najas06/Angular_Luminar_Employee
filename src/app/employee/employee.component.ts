import { Component, OnInit } from '@angular/core';
import { EmpModel } from '../employee.model';
import { ApiService } from '../service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee: EmpModel[] = []

  adminLogin = new Date()
  searchKey: string = ""
  p: number = 1

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

  sortId() {
    this.allEmployee.sort((a: any, b: any) => a.id - b.id)
  }

  sortName() {
    // localeCompare() - method return 1, -1, 0 (after,before,equal)
    this.allEmployee.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }

  removeEmployee(id: string) {
    this.api.deleteEmployeeAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllEmployee()
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  generatePDF(){
    // 1) create a object of jsPDF 
    const pdf = new jsPDF()

    const head = [["userId","username","email","status"]]

    const body:any=[]

    pdf.setFontSize(16) // font size

    // 2) push the data to the body part
    this.allEmployee.forEach((item)=>{
      if(item.id!="1"){
        if(item.status == "1"){
          body.push([item.id,item.name,item.email,"Active"])
        }
        else{
          body.push([item.id,item.name,item.email,"Inactive"])
        }
      }
    })
    pdf.text("Employee Details",10,10) // head line with spacing

    autoTable(pdf,{head,body})
    pdf.output("dataurlnewwindow")

    //3) save the object 
    pdf.save("employe_table.pdf")
  }
}
