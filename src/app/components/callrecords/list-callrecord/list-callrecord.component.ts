import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';
import { ListCallRecord } from 'src/app/contracts/list-call-record';
import { ListUser } from 'src/app/contracts/list-user';
import { CallrecordService } from 'src/app/services/callrecord.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import { SignalRService } from 'src/app/services/signalr.service';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';




@Component({
  selector: 'app-list-callrecord',
  templateUrl: './list-callrecord.component.html',
  styleUrls: ['./list-callrecord.component.scss']
})
export class ListCallrecordComponent implements OnInit {

  constructor(
    private callRecordService:CallrecordService,
    private toastrService:CustomToastrService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private userService:UserService,
    private signalRService: SignalRService
    ){
      signalRService.start(HubUrls.CallRecordHub);
    }
  // number
  CallRecordPerPage:number=5;
  selectedPage:number=1;
  totalCallRecordCount:number;
  callrecordId:number;
  totalRepresentative:number;
  //list
  callRecords:ListCallRecord[]=null;
  representatives:ListUser[]=null;
  //string
  selectedRepresentativeId:string;
  searchQuery: string = '';
  //class
  selectedSearchOption: keyof ListCallRecord;
  // boolean
  isActive:boolean;
  isSearchVisible:boolean;

  setId(id:number){
    this.callrecordId = id;
  }
  
  getUnansweredCallCount(): number {
    let unansweredCount = 0;
    for (const callRecord of this.callRecords) {
      if (callRecord.responseTime==null) {
        unansweredCount++;
      }
    }
   this.getCallRecords()
    return unansweredCount;
  }
  

  toggleSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  async handleRepresentativeSelection(representativeId: string) {
    if(representativeId != "0"){
      this.selectedPage = 1; // Seçilen temsilciye göre sayfalamayı sıfırla
      const callRecords:{ totalCount: number; callRecords: ListCallRecord[]}= (await this.callRecordService.filterByRepresentative(this.selectedPage-1, this.CallRecordPerPage,representativeId,()=>console.log(""),()=>this.toastrService.message("Filtreleme Başarısız!","Hata!",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight}),
      ));
      
    this.callRecords=callRecords.callRecords;
    this.totalCallRecordCount=callRecords.totalCount
    }
    else{
      this.selectedPage = 1;
      await this.getCallRecords();
    }
    
    // this.toastrService.message("Listelerken Hata oluştu","Hata!",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
    
  }

  async getRepresentatives(){
    this.selectedRepresentativeId=null;
    const representatives:{ totalCount: number; datas: ListUser[]}= await this.userService.getFilterByRoleName(0, 15,"temsilci",()=>console.log("Temsilciler Listelendi"),errorMessage=>this.toastrService.message(`Temsilciler Listelenemedi!${errorMessage}`,"Hata!",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
    );
  
  this.representatives=representatives.datas;
  this.totalRepresentative=representatives.totalCount
  }




  async getCallRecords()
 {
  // this.selectedPage=1;
  const callRecords:{ totalCount: number; callRecords: ListCallRecord[]}= (await this.callRecordService.read(this.selectedPage-1, this.CallRecordPerPage,()=>console.log("başarılı"),()=>this.toastrService.message("Kayıtlar Listelenemedi","Hata!",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
  ));
  
  this.callRecords=callRecords.callRecords;
  this.totalCallRecordCount=callRecords.totalCount
  
 }

 getPageNumbers(): number[] {
  if (!this.totalCallRecordCount || !this.CallRecordPerPage)
    return [];
  return Array(Math.ceil(this.totalCallRecordCount / this.CallRecordPerPage))
    .fill(0)
    .map((_, i) => i + 1);
}

downloadExcel() {
  const element = document.getElementById('callRecords-table'); // Tablonun bulunduğu elementin ID'si
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Gorusmeler');

  const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const date = new Date().toISOString().slice(0, 19).replace(/:/g,''); // Dosya adına tarih eklemek için kullanılabilir

  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'tablo-' + date + '.xlsx'); // Dosya adını ve türünü belirleyin
}

downloadPDF() {
  const element = document.getElementById('callRecords-table'); // Tablonun bulunduğu elementin ID'si
  
  const date = new Date().toISOString().slice(0, 19).replace(/:/g,'');
  // html2pdf nesnesini oluştur
  const opt = {
    filename: `Gorusmeler-${date}.pdf`,
    margin: [5, 10, 5, 10],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
  };

  // Tabloyu PDF'e dönüştür ve indir
  html2pdf().set(opt).from(element).save();
}

async createResponse(id: number,reply:HTMLInputElement) {
  try {
    await this.callRecordService.createResponse(id,reply.value);
    this.toastrService.message(`${id} Id'li Çağrıya Dönüş Yapıldı.`, "Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
    // console.log(`${id},${reply}`);
    this.getCallRecords();
   await this.ngZone.run(() => { this.ngOnInit()}); //verilerin güncel halini göstermek için.Değişiklikleri kontrol etmesini söyler.

  } catch (error) {
    this.toastrService.message(`Çağrıya Dönüş Yapılamadı!`, "Hata", {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopRight
    });
  }
}




async deleteCallRecord(id:number){
  if(id){
    await this.callRecordService.delete(id);
    this.toastrService.message(`${id} id'li Çağrı Silindi.`,"Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight});
    this.ngZone.run(() => {this.ngOnInit()}); 

  }
  else
  this.toastrService.message(`Çağrı silinemedi!`,"Hata",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight});
  
}


changePage(page:number){
  this.selectedPage = page;
  this.getCallRecords();

 }

 async ngOnInit(){
  await this.getRepresentatives();
  await this.getCallRecords();
  this.signalRService.on(ReceiveFunctions.CallRecordAddedMessageReceiveFunction, message => {
    this.toastrService.message(message,"Yeni Talep",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopFullWidth});
  });
  

}

}
