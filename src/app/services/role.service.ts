import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ListRole } from '../contracts/list-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }


  async getAll(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; datas: ListRole[]}> {
    const promiseData: Promise<{ totalCount: number; datas: ListRole[]}> = this.httpClientService.get<{ totalCount: number; datas: ListRole[]}>({
      controller: "roles",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
}
