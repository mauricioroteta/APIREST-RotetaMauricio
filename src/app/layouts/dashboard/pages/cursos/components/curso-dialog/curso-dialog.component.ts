import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CURSOS } from '../../models';
import { telefonoValidator, isValidCUITCUIL } from '../../../../../../shared/validators';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Curso-dialog',
  templateUrl: './Curso-dialog.component.html',
  styleUrl: './curso-dialog.component.scss',
})
export class CursoDialogComponent {
  CursoForm: FormGroup;

  isAdmin: boolean | undefined;
  userData: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: CURSOS
  ) {
    this.CursoForm = this.formBuilder.group({
      curso: [
        '',
        [Validators.required],
      ],
      descripcion: [
        '',
        [Validators.required]],
      Categoria: [
        '',
        [Validators.required]],
      NroClases: [
        '',
        [Validators.required]],
      dificultad: [
        '',
        [Validators.required]],
    });

    if (editingUser) {
      this.CursoForm.patchValue(editingUser);
    }
  }

  get cursoControl() {
    return this.CursoForm.get('curso');
  }

  get categoriaControl() {
    return this.CursoForm.get('Categoria');
  }

  get NroClasesControl() {
    return this.CursoForm.get('NroClases');
  }

  get descripcionControl() {
    return this.CursoForm.get('descripcion');
  }

  get dificultadControl() {
    return this.CursoForm.get('dificultad');
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;
      }
    });
  }
  
  onSave(): void {
    if (this.CursoForm.invalid) {
      this.CursoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.CursoForm.value);
    }
  }


}
