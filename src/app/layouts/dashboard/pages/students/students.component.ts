import { Component, Output, EventEmitter } from '@angular/core';
import { ALUMNOS } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../../../core/services/alumnos.service';

import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  displayedColumns: string[] = [
    'id',
    'avatar',
    'nombre',
    'apellido',
    'telefono',
    'email',
    'actions'
  ];

  loading = false;

  userData: Subscription = new Subscription();
   isAdmin: boolean = false;

  students: ALUMNOS[] = [];

  constructor(private matDialog: MatDialog, private AlumnosService: AlumnosService, private authService: AuthService,) {}

  ngOnInit(): void {
    this.loading = true;
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;
      }
    });
    this.AlumnosService.getAlumnos().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: () => {
        Swal.fire('Error', 'Ocurrio un error', 'error');
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  openDialog(editingUser?: ALUMNOS): void {
    this.matDialog
      .open(StudentDialogComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.students = this.students.map((u) =>
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              result.id = new Date().getTime().toString().substring(0, 3);
              result.createAt = new Date();
              this.students = [...this.students, result];
            }
          }
        },
      });
  }

  onDeleteUser(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.students = this.students.filter((u) => u.id !== id);
        Swal.fire('¡Eliminado!', 'El Alumno ha sido eliminado.', 'success');
      }
    });
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.students.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  // Pagina inicial
  p: number = 1;

  // Cantidad de elementos por página
  pageSize: number = 6;
  goToFirstPage(): void {
    this.p = 1;
  }

  goToLastPage(): void {
    this.p = this.getLastPage();
  }

  getLastPage(): number {
    return Math.ceil(this.students.length / this.pageSize);
  }
  getPaginatedStudents(): any[] {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.students.slice(startIndex, endIndex);
  }
}
