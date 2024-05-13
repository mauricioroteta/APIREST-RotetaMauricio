import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('authGuard')

  //const router = inject(Router);
  const authService = inject(AuthService);

  const isAuth = authService.verifyToken();

  //return isAuth || router.createUrlTree(['auth']);
  return isAuth;
};
