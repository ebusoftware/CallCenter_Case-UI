import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Toast } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authenticatedKey = 'isAuthenticated'; // Eklendi
  private _isAuthenticated: boolean = false; // Değiştirildi
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this._isAuthenticated);

  get isAuthenticatedSubject$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService) {
    this.identityCheck();
  }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    this._isAuthenticated = token != null && !expired;
    localStorage.setItem(this.authenticatedKey, this._isAuthenticated.toString()); // Eklendi


    if (!this._isAuthenticated)
    {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    const isAuthenticated = this.isAuthenticated;
    this.isAuthenticatedSubject.next(isAuthenticated); // Notify subscribers about the authentication status change

  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  logOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isAuthenticated");

    this._isAuthenticated = false;
    localStorage.setItem(this.authenticatedKey, this._isAuthenticated.toString()); // Eklendi
    this.router.navigate(["callcenter"]);
    this.toastrService.message("Çıkış Yapıldı", "Oturum Kapatıldı.", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }
}


