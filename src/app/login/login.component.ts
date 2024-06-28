import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mailId: string = ""
  password: string = ""

  constructor(private api: ApiService, private router:Router ) { }
  login() {
    if (!this.mailId || !this.password) {
      Swal.fire({
        title:"Info",
        text:"Please fill the form Completely",
        icon:'info'
      })
    }
    else {
      this.api.loginAPI().subscribe({
        next: (res: any) => {
          // console.log(res);
          const { email, password } = res
          if (email == this.mailId && password == this.password) // first password word is destruct from res
          {
           Swal.fire({
            title:'Wow',
            text:"Login Successfull",
            icon:"success"
           })
           this.api.updateData(true)
            this.router.navigateByUrl('/dashboard')
          }
          else{
            Swal.fire({
              title:'Oops',
              text:"Invalid Email or Password",
              icon:"error"
             })
          }

        },
        error: (err: any) => {
          console.log(err);

        }
      })
    }
  }
}
