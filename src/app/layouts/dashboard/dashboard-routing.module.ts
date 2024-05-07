import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../dashboard/pages/home/home.component";
import { StudentsComponent } from './pages/students/students.component';
import { CursosComponent } from "../dashboard/pages/cursos/cursos.component";
import { usersComponent } from './pages/users/users.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { StudentsModule } from './pages/students/students.module';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: "home", component: HomeComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    data: { titulo: ""}
  },
  {
    path: "students",
    component: StudentsComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
    data: { titulo: "- Alumnos"}
  },
  {
    path: "cursos",
    component: CursosComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
    data: { titulo: " - Cursos"}
  },
  {
    path: "clases",
    component: ClasesComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/clases/clases.module').then((m) => m.ClasesModule),
    data: { titulo: " - Clases"}
  },
  {
    path: "users",
    component: usersComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/users/users.module').then((m) => m.usersModule),
    data: { titulo: " - Usuarios"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
