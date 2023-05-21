import { Component, OnInit } from '@angular/core';
import { ListUser } from 'src/app/contracts/list-user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/user.service';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  constructor(
    private userService:UserService,
    private toastrService:CustomToastrService
  ){}

  //List
  users:ListUser[]=null;
  
  // boolean

  //number
  totalUsersCount:number;
  userPerPage:number=5;
  selectedPage:number=1;

  async getUsers()
 {
  const users:{ totalUsersCount: number; users: ListUser[]}= (await this.userService.getAll(this.selectedPage-1, this.userPerPage,()=>console.log("başarılı"),()=>this.toastrService.message("Kayıtlar Listelenemedi","Hata!",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
  ));
  this.users=users.users;
  this.totalUsersCount=users.totalUsersCount;
  
 }

async deleteUser(id:string){

}

 getPageNumbers(): number[] {
  if (!this.totalUsersCount || !this.userPerPage)
    return [];
  return Array(Math.ceil(this.totalUsersCount / this.userPerPage))
    .fill(0)
    .map((_, i) => i + 1);
}
changePage(page: number) {
  this.selectedPage = page;
  this.getUsers();
}

downloadExcel() {
  const element = document.getElementById('users-table'); // Tablonun bulunduğu elementin ID'si
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'kullanicilar');

  const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const date = new Date().toISOString().slice(0, 19).replace(/:/g,''); // Dosya adına tarih eklemek için kullanılabilir

  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'tablo-' + date + '.xlsx'); // Dosya adını ve türünü belirleyin
}

downloadPDF() {
  const element = document.getElementById('users-table'); // Tablonun bulunduğu elementin ID'si
  
  const date = new Date().toISOString().slice(0, 19).replace(/:/g,'');
  // html2pdf nesnesini oluştur
  const opt = {
    filename: `kullanicilar-${date}.pdf`,
    margin: [5, 10, 5, 10],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
  };

  // Tabloyu PDF'e dönüştür ve indir
  html2pdf().set(opt).from(element).save();
}




 async ngOnInit() {
   await this.getUsers()
    
  }

}
