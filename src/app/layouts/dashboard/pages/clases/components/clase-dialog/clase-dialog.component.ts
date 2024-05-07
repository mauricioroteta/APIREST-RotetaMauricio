import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CLASES } from '../../models';
import { telefonoValidator, isValidCUITCUIL } from '../../../../../../shared/validators';
import { DatePipe } from '@angular/common'; // Importa el DatePipe
import { AuthService } from '../../../../../../core/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-Clase-dialog',
  templateUrl: './Clase-dialog.component.html',
  styleUrl: './clase-dialog.component.scss',
})

export class ClaseDialogComponent {

  ClaseForm: FormGroup;

  isAdmin: boolean | undefined;
  userData: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: CLASES,
  ) {
    this.ClaseForm = this.formBuilder.group({
      NombreCurso: [
        '',
        [Validators.required],
      ],
      fechaIni: [
        '',
        [Validators.required]],
      fechaFin: [
        '',
        [Validators.required]],
      horaIni: [
        '',
        [Validators.required]],
      horaFin: [
        '',
        [Validators.required]],
    });

    if (editingUser) {
      this.ClaseForm.patchValue(editingUser);
    }
  }

  get NombreCursoControl() {
    return this.ClaseForm.get('NombreCurso');
  }

  get fechaIniControl() {
    return this.ClaseForm.get('fechaIni');
  }

  get fechaFinControl() {
    return this.ClaseForm.get('fechaFin');
  }

  get horaIniControl() {
    return this.ClaseForm.get('HoraIni');
  }

  get horaFinControl() {
    return this.ClaseForm.get('HoraFin');
  }

  onSave(): void {
    if (this.ClaseForm.invalid) {
      this.ClaseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.ClaseForm.value);
    }
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;
      }
    });
  }
  
}
