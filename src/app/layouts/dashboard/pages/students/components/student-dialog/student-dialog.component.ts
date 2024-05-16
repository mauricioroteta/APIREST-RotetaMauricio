import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ALUMNOS } from '../../models';
import { telefonoValidator } from '../../../../../../shared/validators';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { CURSOSxALUMNO } from '../../models';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss'],
})
export class StudentDialogComponent implements OnInit, OnDestroy {
  studentForm: FormGroup;
  isAdmin: boolean | undefined;
  userData: Subscription = new Subscription();
  cursosDisplayedColumns: string[] = ['id', 'clasesPresente', 'puntos', 'actions'];
  cursosDataSource: CURSOSxALUMNO[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: ALUMNOS
  ) {
    this.studentForm = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$')],
      ],
      apellido: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      telefono: ['', [Validators.required, telefonoValidator()]],
      avatar: ['https://cdn-icons-png.flaticon.com/128/16/16612.png'],
      cursosA: [[]]
    });

    if (editingUser) {
      this.studentForm.patchValue(editingUser);
      this.cursosDataSource = editingUser.cursosA || [];
    }
  }

  get nombreControl() {
    return this.studentForm.get('nombre');
  }

  get apellidoControl() {
    return this.studentForm.get('apellido');
  }

  get telefonoControl() {
    return this.studentForm.get('telefono');
  }

  get emailControl() {
    return this.studentForm.get('email');
  }

  get avatarControl() {
    return this.studentForm.get('avatar');
  }

  get cursosAControl() {
    return this.studentForm.get('cursosA');
  }

  onSave(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentForm.value);
    }
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.userData.unsubscribe();
  }

  onDeleteClase(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursosDataSource = this.cursosDataSource.filter((u) => u.id !== id);
        Swal.fire('¡Eliminado!', 'El Alumno ha sido eliminado.', 'success');
      }
    });
  }

}
