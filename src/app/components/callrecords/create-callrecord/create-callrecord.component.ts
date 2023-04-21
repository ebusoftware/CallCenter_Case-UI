import { Component, OnInit } from '@angular/core';
import { CreateCallrecord } from 'src/app/contracts/create-callrecord';
import { CallrecordService } from 'src/app/services/callrecord.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { DecodeService } from 'src/app/services/decode.service';

@Component({
  selector: 'app-create-callrecord',
  templateUrl: './create-callrecord.component.html',
  styleUrls: ['./create-callrecord.component.scss']
})
export class CreateCallrecordComponent implements OnInit {
  constructor(private decodeService:DecodeService, private toastrService:CustomToastrService,private callRecordService:CallrecordService) {}

  userId:string=null;

  create(txtTitle: HTMLInputElement,txtMessage:HTMLTextAreaElement) {
    const create_callRecord: CreateCallrecord = new CreateCallrecord();
    create_callRecord.userId=this.userId;
    create_callRecord.requestType= txtTitle.value;
    create_callRecord.notes= txtMessage.value;
    if(this.userId)
    {
      this.callRecordService.create(create_callRecord, () => {
        this.toastrService.message("Çağrı talebi oluşturuldu","Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
  
        });
      }, errorMessage => {
        this.toastrService.message(errorMessage,"Çağrı talebi oluşmadı! ",{
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
