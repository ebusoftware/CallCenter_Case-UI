import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { CustomToastrService } from './custom-toastr.service';
import { User } from '../contracts/user';
import { Create_User } from '../contracts/create-user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService,private toastrService: CustomToastrService) { }


  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

}
