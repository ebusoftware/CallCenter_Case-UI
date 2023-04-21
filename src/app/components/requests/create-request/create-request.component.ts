import { Component, OnInit } from '@angular/core';
import { CreateRequest } from 'src/app/contracts/create-request';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { DecodeService } from 'src/app/services/decode.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  constructor(private requestService:RequestService,private decodeService:DecodeService, private toastrService:CustomToastrService ) {}
    userId:string=null;

    create(txtTitle: HTMLInputElement) {
      const create_request: CreateRequest = new CreateRequest();
      create_request.userId=this.userId;
      create_request.requestType= txtTitle.value
      if(this.userId)
      {
        this.requestService.create(create_request, () => {
          this.toastrService.message("Talep oluşturuldu","Başarılı",{
            messageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
    
          });
        }, errorMessage => {
          this.toastrService.message(errorMessage,"Talep oluşurken hata oluştu",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopRight
          });
        });
      }
      else
      this.toastrService.message("Kullanıcı Bulunamadı","Lütfen giriş yapınız.",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRight
      });
      
    }


  ngOnInit(): void {
    this.userId = this.decodeService.getUserId();
  }


}
