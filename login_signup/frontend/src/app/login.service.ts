import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  insertdata(data: any) {
    return this.http.post<any[]>(environment.apiurl + 'route_1/insertdata', data);
  }

  insertimage(Pimg: any) {
    return this.http.post<any[]>(environment.apiurl + 'route_1/insertimage', Pimg);
  }

  getdata(data1: any) {
    return this.http.post<any[]>(environment.apiurl + 'route_1/login', { data1 });
  }

  getalldata() {
    return this.http.get<any[]>(environment.apiurl + 'route_1/getalldata');
  }

  getsingledata(id: any) {
    return this.http.post<any[]>(environment.apiurl + 'route_1/getsingledata', { id });
  }

  deleteuser(id: any) {
    return this.http.post(environment.apiurl + 'route_1/deleteuser', { id });
  }

  updateuser(id: any, newdata: any,url:any) {
    console.log(url);
    return this.http.post<any[]>(environment.apiurl + 'route_1/updateuser', { id, newdata,url});
  }
  
  updateuserimage(id: any, newdata: any) {
    return this.http.post<any[]>(environment.apiurl + 'route_1/updateuser', { id, newdata});
  }
}
