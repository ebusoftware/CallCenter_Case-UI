import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { DecodeService } from 'src/app/services/decode.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  constructor(private decodeService:DecodeService, private authService: AuthService){ }
  isAuthorized:boolean;
  userName:string =null;
  userRole:string= null;

  getRole():boolean{
    return (this.isAuthorized = this.decodeService.roleNameFilter(
      'Temsilci',
      'Admin'
      ));
  }

  
  
  ngOnInit(): void {
    this.authService.isAuthenticatedSubject$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.userName = this.decodeService.getUserName();
        this.userRole = this.decodeService.getRoleName();
        this.getRole();
      } else {
        this.userName = null;
        this.userRole = null;
        this.isAuthorized = false;
      }
    });
  }

}
