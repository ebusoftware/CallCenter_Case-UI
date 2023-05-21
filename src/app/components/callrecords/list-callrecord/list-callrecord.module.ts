import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCallrecordComponent } from './list-callrecord.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from 'src/app/pipes/searchfilter.pipe';



@NgModule({
  declarations: [
    ListCallrecordComponent,
    SearchfilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild([
      { path: "", component: ListCallrecordComponent }
    ]),
  ]
})
export class ListCallrecordModule { }
