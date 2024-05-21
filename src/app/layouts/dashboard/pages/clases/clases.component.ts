import { Component, Output, EventEmitter } from '@angular/core';
import { CLASES } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ClaseDialogComponent } from './components/clase-dialog/clase-dialog.component';
import Swal from 'sweetalert2';
import { clasesService } from '../../../../core/services/clases.service';

import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Clases',
  templateUrl: './Clases.component.html',
  styleUrl: './clases.component.scss',
})
export class ClasesComponent {
  displayedColumns: string[] = [
    'id',
    'NombreCurso',
    'fechaIni',
    'horaIni',
    'horaFin',
    'actions'
  ];

  loading = false;

  userData: Subscription = new Subscription();
  isAdmin: boolean = false;

  clases: CLASES[] = [];

  constructor(private matDialog: MatDialog, private clasesService: clasesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;
      }
    });
    this.clasesService.getClases().subscribe({
      next: (clases) => {
        this.clases = clases;
      },
      error: () => {
        Swal.fire('Error', 'Ocurrio un error', 'error');
      },
      complete: () => {
        this.loading = false;
      }
    })
  }


  openDialog(editingUser?: CLASES): void {
    this.matDialog
      .open(ClaseDialogComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.clases = this.clases.map((u) =>
              u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              result.id = new Date().getTime().toString().substring(0, 3);
              result.createAt = new Date();
              this.clases = [...this.clases, result];
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
        this.clases = this.clases.filter((u) => u.id !== id);
        Swal.fire('¡Eliminado!', 'El Clase ha sido eliminada.', 'success');
      }
    });
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.clases.length / this.pageSize);
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
    return Math.ceil(this.clases.length / this.pageSize);
  }

  getPaginatedClases(): any[] {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.clases.slice(startIndex, endIndex);
  }
}
