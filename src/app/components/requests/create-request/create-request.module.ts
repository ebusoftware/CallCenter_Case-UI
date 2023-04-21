import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRequestComponent } from './create-request.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CreateRequestComponent
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild([
      { path: "", component: CreateRequestComponent }
    ]),
  ]
})
export class CreateRequestModule { }
