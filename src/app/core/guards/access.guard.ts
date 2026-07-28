import { inject } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router, UrlTree } from '@angular/router';

export const canActiveAuth = (): boolean | UrlTree => {
  const isLoggedIn = inject(AuthService).isAuth;
  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
