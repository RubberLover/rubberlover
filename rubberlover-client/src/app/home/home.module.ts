import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TireTableComponent } from './tire-table/tire-table.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    HomeComponent,
    TireTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers: [
    MessageService
  ]
})
export class HomeModule { }
