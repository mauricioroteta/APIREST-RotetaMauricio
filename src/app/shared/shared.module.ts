import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatCalendar, MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormFieldValidationErrorsPipe } from './pipes/form-field-validation-errors.pipe';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [FormFieldValidationErrorsPipe],
  imports: [CommonModule],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    FormFieldValidationErrorsPipe,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule
  ],
})
export class SharedModule {}
