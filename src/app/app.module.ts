import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';

const BASE_URL = 'https://localhost:44372/api';
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    LayoutModule,
    ComponentsModule,
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports:[
    LayoutModule
  ],
  providers: [
    { provide: 'BASE_URL', useValue: BASE_URL , multi:true}
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
