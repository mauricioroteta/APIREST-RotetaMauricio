import { Injectable } from '@angular/core';
import { Observable, delay, of, pipe } from 'rxjs';

import { CURSOS } from '../../layouts/dashboard/pages/cursos/models';
import { CursosService } from './cursos.service';

import { CLASES } from '../../layouts/dashboard/pages/clases/models';

const clasesJson = '[{"id":1,"idCurso":1,"fechaIni":"2024-06-01","fechaFin":"2024-08-01","horaIni":"20:30","horaFin":"22:30"},{"id":2,"idCurso":1,"fechaIni":"2024-06-15","fechaFin":"2024-08-15","horaIni":"20:30","horaFin":"22:30"},{"id":3,"idCurso":2,"fechaIni":"2024-06-02","fechaFin":"2024-09-02","horaIni":"21:30","horaFin":"23:30"}]';
const clases: CLASES[] = JSON.parse(clasesJson) as CLASES[];
@Injectable({
  providedIn: 'root'
})

export class clasesService {
  clases: any[] = clases;

  constructor(private cursosService: CursosService) {}

  getClases(): Observable<CLASES[]> {
    // Agrega el nombre del curso a cada clase
    const clasesConNombreCurso = this.clases.map(clase => {
      const curso = this.cursosService.obtenerNombreCurso(clase.idCurso);
      return { ...clase, NombreCurso: curso || 'Curso no encontrado' };
    });

    return of(clasesConNombreCurso).pipe(delay(500));
  }

   getClasesByUser(userID: number): CLASES | undefined {
    return this.clases.find(usuario => usuario.id === userID);
  }

}
