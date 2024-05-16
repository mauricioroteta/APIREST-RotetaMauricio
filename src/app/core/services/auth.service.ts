import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { USUARIOS } from '../../layouts/dashboard/pages/users/models';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAdmin: boolean = false;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private usuarios: USUARIOS[] = [];


  constructor(private router: Router, private usuariosService: UsuariosService) { }

  obtenerUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
    });
  }

  login(username: string, password: string): Observable<boolean> {

    // Verifica que el usuario existe
    const usuarioExiste = this.usuariosService.verificarUsuario(username);
    if (usuarioExiste){
      const user = this.usuariosService.obtenerUsuario(username);
      const isAuthenticated = (password === user?.password);
      if (!isAuthenticated){
        Swal.fire({
          title: "Error!",
          text: "Password incorrecto",
          icon: "error"
        });
      }else{
      if (user?.rol === "admin") {
        this.isAdmin = true
      }
      this.isLoggedInSubject.next(isAuthenticated);
      const userData = { usuario: username, avatar:user?.avatar, nombreCompleto:user?.nombre + ' ' + user?.apellido, rol: user?.rol, isAdmin: this.isAdmin };
      this.userDataSubject.next(userData);
      localStorage.setItem('user', userData.usuario);
      localStorage.setItem('rol', userData.rol);
      localStorage.setItem('nombre', userData.nombreCompleto);
      localStorage.setItem('avatar', userData.avatar);

    }
    }else{
      this.isAdmin = false
      Swal.fire({
        title: "Error!",
        text: "Usuario incorrecto",
        icon: "error"
      });
    }

      return this.isLoggedInSubject.asObservable();
  }

  verifyToken(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  getUserData(): Observable<any> {
    console.log("getUserData");
    const user = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');
    const nombreUsuario = localStorage.getItem('nombre');
    const avatar = localStorage.getItem('avatar');
    if (user && rol) {
      console.log("usuario = " + user)
      this.userDataSubject.next({ usuario: user, rol: rol, nombre: nombreUsuario, avatar: avatar });
    }
    return this.userDataSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('avatar');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  loginGoogle(): void {
    Swal.fire({
      title: "Error!",
      text: "Usuario o password incorrecto",
      icon: "error"
    })
  }

}
