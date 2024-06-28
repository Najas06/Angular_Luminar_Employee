import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected : Date | null = new Date()
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {}; // required

  constructor( private api:ApiService){
    this.chartOptions=
    {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Project Completion'
      },
      tooltip: {
          valueSuffix: '%'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      credits:{
        enabled:false
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [
                  {
                      name: 'E-commerce',
                      y: 55.02
                  },
                  {
                      name: 'Blog',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Personal Website',
                      y: 1.09
                  },
                  {
                      name: 'Students',
                      y: 15.5
                  },
                  {
                      name: 'Individuals',
                      y: 1.68
                  }
              ]
          }
      ]
  }
  }


  ngOnInit(): void {
      this.getTotalEmployee()
      this.api.loginAPI().subscribe({
        next:(res:any)=>{
            // console.log(res);
            this.adminDetail = res
            if(res.picture){
                this.profileImage = res.picture
            }
        },
        error:(err:any)=>{
            console.log(err);
        }
      })
  }

  editStatus:boolean = true
  totalEmployee:number = 0
  adminDetail:any = {}

  profileImage:string = "https://cdn-icons-png.flaticon.com/512/3789/3789820.png"
  getEditStatus(){
    this.editStatus = false
  }

  getTotalEmployee(){
    this.api.getAllEmployeeAPI().subscribe({
        next:(res:any)=>{
            this.totalEmployee = res.length-1 
        },
        error:(err:any)=>{
            console.log(err);
            
        }
    })
  }

  getFile(event:any){
    console.log(event.target.files[0]);

    // create an object for fileReader class
    const file = new FileReader()
    // convert the file into url
    file.readAsDataURL(event.target.files[0])
    // get the url
    file.onload = (event:any)=>{
        // const url = event.target.result
        this.profileImage = event.target.result
        this.adminDetail.picture = this.profileImage
    }
  }

  updateAdmin(){
    this.api.updateAdminDetailsAPI(this.adminDetail).subscribe({
        next:(res:any)=>{
            // console.log(res);
            this.adminDetail = res
            this.profileImage = res.picture
            Swal.fire({
                title:"wow",
                text:"Succesfully Updated",
                icon:"success"
            })
            this.editStatus = true
        },
        error:(err:any)=>{
            console.log(err);
            
        }
    })
  }

  reset(){
    this.api.loginAPI().subscribe({
        next:(res:any)=>{
            // console.log(res);
            this.adminDetail = res
            this.editStatus = true
            if(res.picture){
                this.profileImage = res.picture
            }
            else{
                this.profileImage = "https://cdn-icons-png.flaticon.com/512/3789/3789820.png"
            }
        },
        error:(err:any)=>{
            console.log(err);
        }
    })
  }
}
