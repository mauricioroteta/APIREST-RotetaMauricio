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

// export class CursosService {

//   constructor() { }

//   obtenerNombreCurso(idCurso: number): string | null {
//     // Busca el curso con el ID dado
//     const cursoEncontrado = cursos.find(curso => curso.id === idCurso);
//     return cursoEncontrado ? cursoEncontrado.curso : null;
//   }

//   // getCursos(): Observable<CURSOS[]> {
//   //   return of(cursos).pipe(delay(500));
//   // }

//   getCursos(): Promise<CURSOS[]> {
//     return new Promise(resolve => {
//       // Simulando una llamada asíncrona
//       setTimeout(() => {
//         resolve(cursos);
//       }, 500);
//     });
//   }

// }


export class CursosService {

  constructor(private httpClient: HttpClient) {}

  obtenerNombreCurso(idCurso: number): string | null {
    // Busca el curso con el ID dado
    //const cursoEncontrado = cursos.find(curso => curso.id === idCurso);
    //return cursoEncontrado ? cursoEncontrado.curso : null;
    return "Nombre Curso";
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
