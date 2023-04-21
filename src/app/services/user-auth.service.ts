import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';
import { TokenResponse } from '../contracts/token-response';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,private toastrService: CustomToastrService) { }
  
  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Giriş Başarılı","Hoşgeldiniz",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      
    }
    
    callBackFunction();
    
  }
  
  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshtokenlogin",
      controller: "auth"
    }, { refreshToken: refreshToken });
    try {
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }

      callBackFunction(tokenResponse ? true : false);
    } catch {
      callBackFunction(false);
    }
  }





}
