import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCallrecordComponent } from './list-callrecord.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListCallrecordComponent
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
