import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  employee:any={}
  constructor (private api:ApiService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
      this.getAEmployee(id)
    })
  }

  getAEmployee(id:any){
    this.api.getAEmployee(id).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.employee = res
      },
      error:(err:any)=>{console.log(err);
      }
    })
  }

  cancel(id:any){
    this.getAEmployee(id)
  }

  editEmployee(id:any){
    this.api.updateEmployee(id,this.employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title:"Wow",
          text:"Employee updated Successfully",
          icon:"success"
        })
        this.router.navigateByUrl('/employee')
      },
      error:(err:any)=>{console.log(err);
      }
    })
  }
}
