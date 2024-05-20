import { Injectable } from '@angular/core';
import { Observable, delay, of, pipe, map, switchMap } from 'rxjs';
//import AlumnosJson from '../../../assets/alumnos.json';
import { ALUMNOS, ICreateAlumnoPayload, CURSOSxALUMNO} from '../../layouts/dashboard/pages/students/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AlumnosService {

  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<ALUMNOS[]> {
    return this.httpClient.get<ALUMNOS[]>(environment.baseAPIURL + '/alumnos');
  }

  createAlumno(payload: ICreateAlumnoPayload) {

    return this.httpClient.post<ALUMNOS>(
      environment.baseAPIURL + '/alumnos',
      payload
    );
  }

  deleteAlumno(id: string) {
    return this.httpClient.delete<ALUMNOS>(
      environment.baseAPIURL + '/alumnos/' + id
    );
  }

  updateAlumno(id: string, payload: ICreateAlumnoPayload) {

    return this.httpClient.put<ALUMNOS>(
      environment.baseAPIURL + '/alumnos/' + id,
      payload
    );
  }

  getLastId(){
    return this.getAlumnos().pipe(
      map(alumnos => {
        const lastId = alumnos.length > 0 ? Math.max(...alumnos.map(a => parseInt(a.id.toString(), 10))) : 0;
        return String(lastId + 1);
      })
    );
  }

}
