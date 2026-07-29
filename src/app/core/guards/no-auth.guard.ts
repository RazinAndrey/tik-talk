import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { inject } from '@angular/core';

export const noAuthGuard = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuth) {
    return true;
  }

  return router.createUrlTree(['/']);
};
