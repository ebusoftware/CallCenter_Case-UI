import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { CreateCallrecord } from '../contracts/create-callrecord';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ListCallRecord } from '../contracts/list-call-record';

@Injectable({
  providedIn: 'root'
})
export class CallrecordService {

  constructor(private httpClientService:HttpClientService) { }

  async create(request: CreateCallrecord, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "callrecords"
    }, request)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async delete(id: number) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "callrecords",
    }, id);
    await firstValueFrom(deleteObservable);
  }
  

  async createResponse(id: number, reply:any, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "callrecords",
      action:`createreply/${id}?reply=${reply}`
    })
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; callRecords: ListCallRecord[]}> {
    const promiseData: Promise<{ totalCount: number; callRecords: ListCallRecord[]}> = this.httpClientService.get<{ totalCount: number; callRecords: ListCallRecord[]}>({
      controller: "callrecords",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async filterByRepresentative(page: number = 0, size: number = 5,id:string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; callRecords: ListCallRecord[]}> {
    const promiseData: Promise<{ totalCount: number; callRecords: ListCallRecord[]}> = this.httpClientService.get<{ totalCount: number; callRecords: ListCallRecord[]}>({
      controller: "callrecords",
      queryString: `page=${page}&size=${size}`
    },id).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  
  

}
