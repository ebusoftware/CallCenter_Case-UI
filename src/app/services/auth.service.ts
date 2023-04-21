import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Toast } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private jwtHelper: JwtHelperService,private router:Router,private toastrService:CustomToastrService) {
    this.identityCheck();//unutma!
  }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");

    
    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  logOut(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["callcenter"]);
    this.toastrService.message("Çıkış Yapıldı", "Oturum Kapatıldı.", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })

  }

  
}


export let _isAuthenticated: boolean;


