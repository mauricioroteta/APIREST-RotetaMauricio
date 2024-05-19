import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ALUMNOS, ICreateAlumnoPayload } from '../../models';
import { telefonoValidator } from '../../../../../../shared/validators';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { CURSOSxALUMNO } from '../../models';

import { clasesService } from '../../../../../../core/services/clases.service';
import { CLASES, iClasesAlumno } from '../../../clases/models';
import { CURSOS } from '../../../cursos/models/index';
import { AlumnosService } from '../../../../../../core/services/alumnos.service';


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

  clases: CLASES[] = [];
  ClasesAlumno: iClasesAlumno[] = [];

  cursosDataSource: CURSOSxALUMNO[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    public clasesService: clasesService,
    public AlumnosService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public editingUser: ALUMNOS

  ) {
    this.studentForm = this.formBuilder.group({
      idClass: [],
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
      activo: [true],
      clases: []
    });

    if (editingUser) {
      this.studentForm.patchValue(editingUser);
      this.cursosDataSource = editingUser.clases || [];
    }else{
      this.cursosDataSource = [];
    }
  }

  get idClassControl() {
    return this.studentForm.get('idClass');
  }

  get nombreControl() {
    return this.studentForm.get('nombre');
  }

  get ActivoControl() {
    return this.studentForm.get('activo');
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

  get clasesControl() {
    return this.studentForm.get('clases');
  }


  onSave(): void {
    // if (this.editingUser) {
    //   this.editingUser.clases = JSON.parse(JSON.stringify(this.cursosDataSource));
    // }
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
    this.cargarClases();
  }

  ngOnDestroy(): void {
    this.userData.unsubscribe();
  }

  transformToICreateAlumnoPayload(alumno: ALUMNOS): ICreateAlumnoPayload {
    return {
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email,  // Transforming 'email' to 'correo'
      telefono: alumno.telefono,
      avatar: alumno.avatar,
      activo: alumno.activo,
      clases: this.cursosDataSource
    };
  }

  onDeleteClase(id: string): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.cursosDataSource)
        this.cursosDataSource = this.cursosDataSource.filter(clase => clase.idClass.toString() !== id);
        //console.log(this.cursosDataSource)
        //this.editingUser.clases = this.editingUser.clases.filter(clase => clase.idClass.toString() !== id);


        this.AlumnosService.updateAlumno(this.editingUser.id.toString(), this.transformToICreateAlumnoPayload(this.editingUser)).subscribe({
           next: (data) => {
             this.editingUser = data;
           },
         });

        Swal.fire('¡Eliminado!', 'El Alumno ha sido eliminado.', 'success');
      }
    });
  }


  cargarClases(): void {
    this.clasesService.getClases().subscribe((clases) => {
      this.clases = clases;
    });
  }

  onAgergarClase(){
    const claseIdSeleccionada = this.studentForm.get('idClass')?.value;
    if (claseIdSeleccionada) {
      if (this.cursosDataSource) {
        this.cursosDataSource.push({
          idClass: claseIdSeleccionada,
          clasesPresente: 0,
          puntos: 0,
        });

        this.AlumnosService.updateAlumno(this.editingUser.id.toString(), this.transformToICreateAlumnoPayload(this.editingUser)).subscribe({
            next: (data) => {
              this.editingUser = data;
            },
        });

        this.editingUser.clases.push({
          idClass: claseIdSeleccionada,
          clasesPresente: 0,
          puntos: 0,
        });

        console.log(this.editingUser.clases);
      } else {
        console.error('editingUser o clases no está definido');
      }
    } else {
      console.error('No se ha seleccionado ninguna clase');
    }
  }

  // onAgregarClase(): void {
  //   const claseIdSeleccionada = this.studentForm.value.nombre;

  //   if (!this.editingUser.clases.includes(claseIdSeleccionada)) {
  //     const claseSeleccionada = this.clases.find(
  //       (clase) => clase.id === claseIdSeleccionada
  //     );
  //     if (claseSeleccionada) {
  //       this.editingUser.clases.push(claseIdSeleccionada);
  //       this.editingUser
  //       this.AlumnosService.updateAlumno(this.editingUser.id, this.editingUser)
  //         .subscribe({
  //           next: (data) => {
  //             this.editingUser = data;
  //           },
  //           error: (error) => {
  //             Swal.fire({
  //               title: 'Error al agregar la clase al alumno: ' + error,
  //               icon: 'error',
  //             });
  //           },
  //         });
  //     }
  //   } else {
  //     Swal.fire({
  //       title: 'La clase seleccionada ya está agregada al alumno.',
  //       icon: 'warning',
  //     });
  //   }
  // }



}
