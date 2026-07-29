import { inject } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router, UrlTree } from '@angular/router';

export const authGuard = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
