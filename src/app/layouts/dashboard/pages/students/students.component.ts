import { Component, Output, EventEmitter } from '@angular/core';
import { ALUMNOS } from './models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../../../core/services/alumnos.service';

import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { CLASES } from '../clases/models/index';

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
    'activo',
    'actions'
  ];

  loading = false;

  userData: Subscription = new Subscription();
   isAdmin: boolean = false;

  students: ALUMNOS[] = [];

  constructor(private matDialog: MatDialog,
    private AlumnosService: AlumnosService, private authService: AuthService,) {}

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

  getAlumnos(): void {
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
              result.clases = editingUser.clases;
              this.AlumnosService.updateAlumno(editingUser.id, result).subscribe({
                next: (data) => {
                  this.students = this.students.map(editingUser => editingUser.id === editingUser.id ? data : editingUser);
                  this.getAlumnos();
                },
              });
            } else {
              this.AlumnosService.createAlumno(result).subscribe({
                next: (data) => {
                  data.clases = []
                  this.students.push(data);
                  this.getAlumnos();
                },
              });
            }
          }
        },
      });
  }

  onDeleteUser(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'El registro se eliminara permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //this.students = this.students.filter((u) => u.id !== id);

        this.AlumnosService.deleteAlumno(id.toString()).subscribe((data) => {
          Swal.fire({
            title: 'Alumno Borrado',
            icon: 'success',
          });
        });

        Swal.fire('¡Eliminado!', 'El Alumno ha sido eliminado.', 'success');
      }
      this.getAlumnos();
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
