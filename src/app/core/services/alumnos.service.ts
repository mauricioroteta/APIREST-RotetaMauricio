import { Injectable } from '@angular/core';
import { Observable, delay, of, pipe } from 'rxjs';
import AlumnosJson from '../../../assets/alumnos.json';
import { ALUMNOS } from '../../layouts/dashboard/pages/students/models';

const alumnos: ALUMNOS[] = AlumnosJson;

@Injectable({
  providedIn: 'root'
})

export class AlumnosService {

  constructor() { }

  getAlumnos(): Observable<ALUMNOS[]> {
    return of(alumnos).pipe(delay(500));
  }
}
