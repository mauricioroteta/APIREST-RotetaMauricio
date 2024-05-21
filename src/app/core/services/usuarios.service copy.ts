import { Injectable } from '@angular/core';
import { Observable, delay, of, pipe } from 'rxjs';
import { USUARIOS, CreateUSUARIOPayload } from '../../layouts/dashboard/pages/users/models';
//import UsersJson from '../../../assets/users.json';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//const users: USUARIOS[] = UsersJson;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

//  usuarios: any[] = users;

constructor(private httpClient: HttpClient) {}

getUsuarios(): Observable<USUARIOS[]> {
  return this.httpClient.get<USUARIOS[]>(environment.baseAPIURL + '/users');
}

getUsuarioPorId(id: string): Observable<USUARIOS | undefined> {
  return this.httpClient.get<USUARIOS>(environment.baseAPIURL + '/users/' + id);
}

createUsuario(payload: CreateUSUARIOPayload) {
  return this.httpClient.post<USUARIOS>(environment.baseAPIURL + '/users', payload);
}

deleteUsuario(id: string) {
  return this.httpClient.delete<USUARIOS>(environment.baseAPIURL + '/users/' + id);
}

updateUsuario(id: string, payload: CreateUSUARIOPayload) {
  return this.httpClient.put<USUARIOS>(environment.baseAPIURL + '/users/' + id, payload);
}

//   getUsuarios(): Observable<USUARIOS[]> {
//     return of(users).pipe(delay(500));
//   }

//   verificarUsuario(nombreUsuario: string): boolean {
//     const usuarioEncontrado = this.usuarios.find(usuarios => usuarios.userName === nombreUsuario);
//     return usuarioEncontrado ? true : false;
//   }

//   obtenerUsuario(nombreUsuario: string): USUARIOS | undefined {
//     return this.usuarios.find(usuario => usuario.userName === nombreUsuario);
//   }
//

}
