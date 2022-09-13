import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CreateTireDialogComponent } from './create-tire-dialog/create-tire-dialog.component';
import { HomeComponent } from './home/home.component';
import { TireTableComponent } from './tire-table/tire-table.component';
import { TireTypePipe } from './tire-table/tire-type.pipe/tire-type.pipe';
import { ToPrettyUrlPipe } from './tire-table/to-pretty-url.pipe/to-pretty-url.pipe';
import { ToSelectedUnitsPipe } from './tire-table/to-selected-units.pipe/to-selected-units.pipe';
import { TireComponent } from './tire/tire.component';
import { WamComponent } from './tire/wam/wam.component';
import { WeightAsMeasuredFormComponent } from './tire/wam/weight-as-measured-form/weight-as-measured-form.component';
import { WidthAsMeasuredFormComponent } from './tire/wam/width-as-measured-form/width-as-measured-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    TireTableComponent,
    CreateTireDialogComponent,
    TireTypePipe,
    ToPrettyUrlPipe,
    ToSelectedUnitsPipe,
    TireComponent,
    WamComponent,
    WidthAsMeasuredFormComponent,
    WeightAsMeasuredFormComponent
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
    ProgressSpinnerModule,
    TabViewModule,
    SelectButtonModule,
    RouterModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class HomeModule { }
