import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { TireTableComponent } from './tire-table/tire-table.component';

@NgModule({
  declarations: [
    HomeComponent,
    TireTableComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class HomeModule { }
