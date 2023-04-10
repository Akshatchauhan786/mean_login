import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  url: any;
  imageSrc: any;
  myForm: any;
  formData = new FormData();

  constructor(private login: LoginService, private fb: FormBuilder, public route: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.createform();
  }

  createform = () => {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      Username: new FormControl('', Validators.required),
      phonenumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      password: new FormControl('', [Validators.required]),
      gender: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }



  get name() { return this.myForm.get('name'); }
  get email() { return this.myForm.get('email'); }
  get Username() { return this.myForm.get('Username'); }
  get phonenumber() { return this.myForm.get('phonenumber'); }
  get gender() { return this.myForm.get('gender'); }
  get password() { return this.myForm.get('password'); }
  get image() { return this.myForm.get('image'); }


  file: any[] = [];

  onFileChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      // console.log("0000", e.target.files);
      var reader = new FileReader();
      var date = new Date()

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        var url = this.myForm.controls['Username'].value + date.getTime() + '.' + e.target.files[0].type.split('/')[1];
        this.formData.append('image', e.target.files[0], url);
        this.login.insertimage(this.formData).subscribe((data: any) => {
          console.log(data);
        });
        this.myForm.patchValue({ image: url });
      };
    }

  }


  Register() {
    if (this.myForm.valid) {
      this.login.insertdata(this.myForm.value).subscribe((data: any) => {
        console.log(data);
        if (data.length > 0) {
          this.route.navigate(['/login']);
        } else {

        }
      });
    } else {
      console.log("fill form again");
    }
  }
}
