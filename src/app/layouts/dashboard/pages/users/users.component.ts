import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { USUARIOS } from './models';
import { MatDialog } from '@angular/material/dialog';
import { userDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class usersComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'avatar',
    'userName',
    'nombre',
    'apellido',
    'telefono',
    'email',
    'rol',
    'actions'
  ];

  loading = false;

  userData: Subscription = new Subscription();
  isAdmin: boolean = false;

  users: USUARIOS[] = [];

  constructor(private matDialog: MatDialog, private UsuariosService: UsuariosService, private authService: AuthService,) {}

  ngOnInit(): void {
    this.loading = true;
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;
      }
    });

    this.UsuariosService.getUsuarios().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        Swal.fire('Error', 'Ocurrio un error', 'error');
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  openDialog(editingUser?: USUARIOS): void {
    this.matDialog
      .open(userDialogComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.users = this.users.map((u) =>
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              result.id = new Date().getTime().toString().substring(0, 3);
              result.createAt = new Date();
              this.users = [...this.users, result];
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
        this.users = this.users.filter((u) => u.id !== id);
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.users.length / this.pageSize);
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
    return Math.ceil(this.users.length / this.pageSize);
  }
  getPaginatedusers(): any[] {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.users.slice(startIndex, endIndex);
  }
}
