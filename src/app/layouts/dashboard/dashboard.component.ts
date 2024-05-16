import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioRol } from './pages/users/models';
import { DataSource } from '@angular/cdk/collections';
import { LoginModule } from '../login/login.module';

interface UserData {
  usuario: string;
  rol: string;
  avatar: string;
  nombreCompleto: string;
  isAdmin: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class DashboardComponent implements OnInit, OnDestroy {
  showFiller = false;
  titulo: string = '';
  isAuthenticated: boolean = false;
  authSubscription: Subscription;
  userData$?: Observable<UserData>;
  userData: Subscription = new Subscription();
  isAdmin: boolean = false;
  userName: string | null= '';
  rol: string | null= '';
  avatar: string | null= '';

  isMobile(): boolean {
    return window.innerWidth <= 600;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.authSubscription = this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isAuthenticated = loggedIn;
      this.userName = localStorage.getItem('nombre');
      this.rol = localStorage.getItem('rol');
      this.avatar = localStorage.getItem('avatar');
      if (localStorage.getItem('user')) {
        this.isAuthenticated = true;
      }
      if (loggedIn || this.isAuthenticated) {
        this.userData$ = this.authService.getUserData();
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data as { titulo: string })
    ).subscribe(data => {
      this.titulo = data.titulo;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
