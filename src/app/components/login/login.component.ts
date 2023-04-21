import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private userAuthService:UserAuthService, private authService:AuthService, private router:Router,private activatedRoute: ActivatedRoute ) {
    
  }

  async login(usernameOrEmail: string, password: string) {
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();      
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
          
          this.router.navigate(["callcenter"]);
          location.reload();  
      });
    });
  }

}
