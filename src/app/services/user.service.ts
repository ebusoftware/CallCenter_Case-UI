import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { CustomToastrService } from './custom-toastr.service';
import { User } from '../contracts/user';
import { Create_User } from '../contracts/create-user';
import { Observable, firstValueFrom } from 'rxjs';
import { ListUser } from '../contracts/list-user';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService,private toastrService: CustomToastrService) { }


  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users",
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }
  async getAll(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalUsersCount: number; users: ListUser[]}> {
    const promiseData: Promise<{ totalUsersCount: number; users: ListUser[]}> = this.httpClientService.get<{ totalUsersCount: number; users: ListUser[]}>({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async getFilterByRoleName(page: number = 0, size: number = 5,roleName:string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; datas: ListUser[]}> {
    const promiseData: Promise<{ totalCount: number; datas: ListUser[]}> = this.httpClientService.get<{ totalCount: number; datas: ListUser[]}>({
      controller: "users",
      action:"get-users-filter-role-name",
      queryString: `page=${page}&size=${size}&rolename=${roleName}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async getById(id:string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ListUser> {
    const promiseData: Promise<ListUser> = this.httpClientService.get<ListUser>({
      controller: "users",
      action:"GetByUserId"
    },id).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, {
      userId: id,
      roles: roles
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    await promiseData;
  }

  async getRolesToUser(userId: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<{ userRoles: string[] }> = this.httpClientService.get({
      controller: "users",
      action: "get-roles-to-user"
    }, userId);

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    return (await promiseData).userRoles;
  }
  

}
