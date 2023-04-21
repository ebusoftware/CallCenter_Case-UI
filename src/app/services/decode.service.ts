import { DebugElement, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  constructor(private jwtHelper:JwtHelperService) { }
  userRoles: any = '';

  getUserId():string{
    let decode =  this.jwtHelper.decodeToken(localStorage.getItem("accessToken"));
    var userId = Object.keys(decode).filter(p=>p.endsWith("/nameidentifier"))[0];
    return  decode[userId]
  }
  getUserName():string{
    let decode =  this.jwtHelper.decodeToken(localStorage.getItem("accessToken"));
    let username: string = Object.keys(decode).filter(p=>p.endsWith("/name"))[0];
    return  decode[username]
  }
  getRoleName():string{
    let decode =  this.jwtHelper.decodeToken(localStorage.getItem("accessToken"));
    let username: string = Object.keys(decode).filter(p=>p.endsWith("/role"))[0];
    return  decode[username]
  }
  roleNameFilter(roleName1?:string,roleName2?:string):boolean
  {
    let decode =  this.jwtHelper.decodeToken(localStorage.getItem("accessToken"));
    let username: string = Object.keys(decode).filter(p=>p.endsWith("/role"))[0];
    let userRoles: string = decode[username]
    if (Array.isArray(this.userRoles)) { // eğer bir dizi ise, join() metodu ile tekrar string'e dönüştürüyoruz
      this.userRoles = this.userRoles.join(',');
    }
    return userRoles.includes(roleName1) || userRoles.includes(roleName2);
  }
}
