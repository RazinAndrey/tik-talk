import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { AuthService } from '../api/auth.service';
import { ILoginResponse } from '../interfaces/api/auth.model';

// один общий рефреш на всё приложение: пока он не null — параллельные 403 не плодят новые запросы
let refresh$: Observable<ILoginResponse> | null = null;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');

  if (!token) {
    return next(req);
  }

  return next(addToken(req, token)).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 && !req.url.includes('/auth/refresh')) {
        return refreshProceed(authService, cookieService, req, next);
      }

      return throwError(() => error);
    }),
  );
};

const refreshProceed = (
  authService: AuthService,
  cookieService: CookieService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  // если рефреш уже запущен параллельным запросом — не дублируем, ждём тот же
  if (!refresh$) {
    const refreshToken = cookieService.get('refresh_token');

    refresh$ = authService.refreshToken({ refresh_token: refreshToken }).pipe(
      finalize(() => (refresh$ = null)),
      shareReplay(1),
    );
  }

  return refresh$.pipe(switchMap((value) => next(addToken(req, value.access_token))));
};

const addToken = (req: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
