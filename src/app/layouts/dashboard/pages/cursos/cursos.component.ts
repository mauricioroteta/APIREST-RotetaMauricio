import { Component, Output, EventEmitter } from '@angular/core';
import { CURSOS } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CursoDialogComponent } from './components/curso-dialog/curso-dialog.component';
import Swal from 'sweetalert2';
import { CursosService } from '../../../../core/services/cursos.service';

import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Cursos',
  templateUrl: './Cursos.component.html',
  styleUrl: './cursos.component.scss',
})

export class CursosComponent {
  displayedColumns: string[] = [
    'id',
    'curso',
    'Categoria',
    'NroClases',
    'dificultad',
    'descripcion',
    'actions'
  ];

  loading = false;

  userData: Subscription = new Subscription();
  isAdmin: boolean = false;

  Cursos: CURSOS[] = [];

  constructor(private matDialog: MatDialog, private CursosService: CursosService, private authService: AuthService) {}

  // Implementacion con Observable
  ngOnInit(): void {
    this.loading = true;
    this.CursosService.getCursos().subscribe({
      next: (cursos) => {
        try {
              this.userData = this.authService.getUserData().subscribe((userData) => {
                if (userData.rol === 'admin') {
                  this.isAdmin = true;
                }
              });
              this.loading = true;
            } catch (error) {
              Swal.fire('Error', 'Ocurrió un error', 'error');
            } finally {
              this.loading = false;
            }

        this.Cursos = cursos;
      },
      error: () => {
        Swal.fire('Error', 'Ocurrio un error', 'error');
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  openDialog(editingUser?: CURSOS): void {
    this.matDialog
      .open(CursoDialogComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.CursosService.updateCurso(editingUser.id, result).subscribe({
                next: (data) => {
                  this.Cursos.push(data);
                  this.getCursos();
                },
              });
            } else {
              this.CursosService.createCurso(result).subscribe({
                next: (data) => {
                  this.Cursos.push(data);
                  this.getCursos();
                },

              });
            }
          }
        },
      });
  }

  getCursos(): void {
    this.CursosService.getCursos().subscribe({
      next: (data) => {
        this.Cursos = data;
      },
    });
  }

  onDeleteUser(id: string): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'El registro se eliminara permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.CursosService.deleteCurso(id).subscribe((data) => {
          Swal.fire({
            title: 'Curso eliminado',
            icon: 'success',
          });
          this.Cursos = this.Cursos.filter(curso => curso.id !== id);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Petición Cancelada',
          icon: 'error',
        });
      }
    });
  }


  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.Cursos.length / this.pageSize);
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
    return Math.ceil(this.Cursos.length / this.pageSize);
  }
  getPaginatedCursos(): any[] {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.Cursos.slice(startIndex, endIndex);
  }
}
