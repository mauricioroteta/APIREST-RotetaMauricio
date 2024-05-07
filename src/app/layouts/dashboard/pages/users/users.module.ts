import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { usersRoutingModule } from './users-routing.module';
import { usersComponent } from './users.component';
import { userDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    usersComponent,
    userDialogComponent
  ],
  imports: [
    CommonModule,
    usersRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  exports: [usersComponent]
})
export class usersModule { }
