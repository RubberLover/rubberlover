import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext'
import {DropdownModule} from 'primeng/dropdown';
import { TireTableComponent } from './tire-table/tire-table.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTireDialogComponent } from './create-tire-dialog/create-tire-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChipsModule} from 'primeng/chips';

@NgModule({
  declarations: [
    HomeComponent,
    TireTableComponent,
    CreateTireDialogComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ChipsModule
  ],
  providers: [
    MessageService
  ]
})
export class HomeModule { }
