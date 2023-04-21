import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodeService } from 'src/app/services/decode.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  constructor(private decodeService:DecodeService){ }
  isAuthorized:boolean;
  userName:string;
  userRole:string;

  getRole():boolean{
   return this.isAuthorized = this.decodeService.roleNameFilter("Temsilci","Admin");
  }

  
  ngOnInit(): void {
    this.userName=this.decodeService.getUserName();
    this.userRole=this.decodeService.getRoleName();
    this.getRole();
  }

}
