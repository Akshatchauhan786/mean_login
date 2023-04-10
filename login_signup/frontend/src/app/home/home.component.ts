import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import {ConfirmDialogModule} from 'primeng/confirmdialog';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {
  alldata: any;
  display: any;
  myForm: any = FormGroup;
  id: any;
  userid: any;
  base_url: any;
  formData = new FormData();
  url: any;
  show: any;
  imgValue: any;
  constructor(private login: LoginService, private confirmationService: ConfirmationService, private messageService: MessageService, public route: Router) { }

  ngOnInit(): void {
    this.getalldata();
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      Username: new FormControl('', Validators.required),
      phonenumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  getalldata() {
    this.login.getalldata().subscribe((data: any) => {
      this.alldata = data;
      console.log(this.alldata);
      this.base_url = environment.base_url;
    })
  }

  deleteuser(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure ?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Deleted Succesfully' });
        this.login.deleteuser(id).subscribe((data: any) => {
          if (data == "deleted") {
            this.getalldata();
          }
        })
      }
    });
  }

  Updateuser(id: any) {
    this.userid = id;
    this.login.getsingledata(id).subscribe((data: any) => {
      this.myForm.patchValue({
        name: data[0].fullname,
        email: data[0].email,
        Username: data[0].username,
        phonenumber: data[0].phone,
        password: data[0].password,
        gender: data[0].gender
      })
    })
    // this.show = true; 
    this.display = true;
  }

  onFileChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      var date = new Date()
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = this.myForm.controls['Username'].value + date.getTime() + '.' + e.target.files[0].type.split('/')[1];

        this.formData.append('image', e.target.files[0], this.url);
        this.login.insertimage(this.formData).subscribe((data: any) => {
          console.log(data);
        });
        this.myForm.patchValue({ image: this.url });
        console.log(this.myForm.value);
      };
    }
  }

  Updatedata() {

    var newdata = this.myForm.value;
    var id = this.userid;
    if (this.url == null || this.url == 'undefined') {
      this.login.updateuserimage(id, newdata).subscribe((data: any) => {
        if (data == "update") {
          this.messageService.add({ severity: 'success', summary: 'Success' });
          this.route.navigate(['/Home']);
          this.getalldata();
          this.display = false;
        }
      })
    } else {
      this.login.updateuser(id, newdata, this.url).subscribe((data: any) => {
        if (data == "update") {
          this.messageService.add({ severity: 'success', summary: 'Success' });
          this.route.navigate(['/Home']);
          this.getalldata();
          this.display = false;
        }
      })
    }
  }
}
