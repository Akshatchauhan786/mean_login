import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: any;
  user: any;


  constructor(private login: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  myForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get Username() { return this.myForm.get('Username'); }
  get password() { return this.myForm.get('password'); }
  Login() {
    this.login.getdata(this.myForm.value).subscribe((data: any) => {
      if (data == "success") {
        // this.user = data[0];
        // const user = localStorage.setItem('user', JSON.stringify(this.user));;
        this.router.navigate(['/Home']);
      } else {
        if (data == "loginfailed") {
          this.router.navigate(['/login']);
          this.msg = "Username and Password is incorrect";
        }
      }
    });
  }
}
