import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentsModule } from './pages/students/students.module';
import { usersModule } from './pages/users/users.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { ClasesModule } from './pages/clases/clases.module';
import { HomeModule } from './pages/home/home.module';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';

import { SharedModule } from '../../shared/shared.module';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StudentsModule,
    MatMenuModule,
    usersModule,
    CursosModule,
    MatSlideToggleModule,
    MatDividerModule,
    SharedModule,
    HomeModule,
    LoginModule,
    ClasesModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
