import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';
import { ClaseDialogComponent } from './components/clase-dialog/clase-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    ClasesComponent,
    ClaseDialogComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  exports: [ClasesComponent]
})
export class ClasesModule { }
