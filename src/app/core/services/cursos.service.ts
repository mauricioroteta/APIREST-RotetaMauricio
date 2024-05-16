import { Injectable } from '@angular/core';
import { Observable, delay, map, of, pipe } from 'rxjs';
import { CURSOS, ICreateCursoPayload } from '../../layouts/dashboard/pages/cursos/models';
//import cursosJson from '../../../assets/cursos.json';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//const cursos: CURSOS[] = cursosJson;

@Injectable({
  providedIn: 'root'
})

export class CursosService {

  constructor(private httpClient: HttpClient) {}

  // obtenerNombreCurso(idCurso: number) {
  //   // Busca el curso con el ID dado
  //   //return "Nombre Curso";
  //   return this.httpClient.get<string>(environment.baseAPIURL + '/cursos/' + idCurso)
  // }

  obtenerNombreCurso(idCurso: number): Observable<string> {
    return this.httpClient.get<{ curso: string }>(`${environment.baseAPIURL}/cursos/${idCurso}`)
      .pipe(
        map(response => response.curso) // Extraemos el nombre del curso de la respuesta
      );
  }

  getCursos(): Observable<CURSOS[]> {
    return this.httpClient.get<CURSOS[]>(environment.baseAPIURL + '/cursos');
  }

  createCurso(payload: ICreateCursoPayload) {
    return this.httpClient.post<CURSOS>(environment.baseAPIURL + '/cursos', payload);
  }

  deleteCurso(id: string) {
    return this.httpClient.delete<CURSOS>(environment.baseAPIURL + '/cursos/' + id);
  }

  updateCurso(id: string, payload: ICreateCursoPayload) {
    console.log(environment.baseAPIURL + '/cursos/' + id + " " + payload)
    return this.httpClient.put<CURSOS>(environment.baseAPIURL + '/cursos/' + id, payload)
  }

// Dentro de tu servicio
getMaxCursoId(): Observable<number> {
  return this.httpClient.get<CURSOS[]>(environment.baseAPIURL + '/cursos').pipe(
    map((cursos: any[]) => {
      // Encontrar el ID más alto
      const maxId = cursos.reduce((max, curso) => curso.id > max ? curso.id : max, 0);
      return maxId;
    })
  );
}


}
