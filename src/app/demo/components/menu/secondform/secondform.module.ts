import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondformRoutingModule } from './secondform-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecondformRoutingModule,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    DialogModule
  ]
})
export class SecondformModule { }
