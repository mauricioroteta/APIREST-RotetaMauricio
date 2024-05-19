import { Injectable } from '@angular/core';
import { Observable, delay, of, pipe } from 'rxjs';
import { USUARIOS, CreateUSUARIOPayload } from '../../layouts/dashboard/pages/users/models';
import UsersJson from '../../../assets/users.json';

const users: USUARIOS[] = UsersJson;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  usuarios: any[] = users;

  constructor() { }

  getUsuarios(): Observable<USUARIOS[]> {
    return of(users).pipe(delay(500));
  }

  verificarUsuario(nombreUsuario: string): boolean {
    const usuarioEncontrado = this.usuarios.find(usuarios => usuarios.userName === nombreUsuario);
    return usuarioEncontrado ? true : false;
  }

  obtenerUsuario(nombreUsuario: string): USUARIOS | undefined {
    return this.usuarios.find(usuario => usuario.userName === nombreUsuario);
  }
}
