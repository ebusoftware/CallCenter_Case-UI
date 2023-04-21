import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { CreateCallrecord } from '../contracts/create-callrecord';
import { HttpErrorResponse } from '@angular/common/http';

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

  

}
