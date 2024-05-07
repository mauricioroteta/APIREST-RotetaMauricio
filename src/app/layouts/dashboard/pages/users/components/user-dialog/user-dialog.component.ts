import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USUARIOS } from '../../models';
import { telefonoValidator, isValidCUITCUIL } from '../../../../../../shared/validators';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
})
export class userDialogComponent {
  userForm: FormGroup;
  
  isAdmin: boolean | undefined;
  userData: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<userDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: USUARIOS
  ) {
    this.userForm = this.formBuilder.group({
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
      avatar: [
        'https://cdn-icons-png.flaticon.com/128/16/16612.png',
      ],rol: [
        'usr',
      ],
    });

    if (editingUser) {
      this.userForm.patchValue(editingUser);
    }
  }

  get nombreControl() {
    return this.userForm.get('nombre');
  }

  get apellidoControl() {
    return this.userForm.get('apellido');
  }

  get telefonoControl() {
    return this.userForm.get('telefono');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get avatarControl() {
    return this.userForm.get('avatar');
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;      
      }
    });
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }

}
