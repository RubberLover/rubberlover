import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CreateTireDialogComponent } from './create-tire-dialog/create-tire-dialog.component';
import { HomeComponent } from './home/home.component';
import { TireTableComponent } from './tire-table/tire-table.component';
import { TireTypePipe } from './tire-table/tire-type.pipe/tire-type.pipe';
import { ToPrettyUrlPipe } from './tire-table/to-pretty-url.pipe/to-pretty-url.pipe';
import { ToSelectedUnitsPipe } from './tire-table/to-selected-units.pipe/to-selected-units.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    TireTableComponent,
    CreateTireDialogComponent,
    TireTypePipe,
    ToPrettyUrlPipe,
    ToSelectedUnitsPipe
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
    ChipsModule,
    DividerModule,
    MultiSelectModule,
    TooltipModule,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService
  ]
})
export class HomeModule { }
