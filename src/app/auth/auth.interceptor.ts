import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from "rxjs";

let isRefreshing$ = new BehaviorSubject<boolean>(false);

// пришел запрос 
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService)
    const token = authService.token;

    if(!token) return next(req);

    // по второму разу идем сюда
    if(isRefreshing$.value){
        return refreshAndProcced(authService, req, next); 
    }

    // пришел запрос с протукшим токеном
    return next(addToken(req, token)).pipe(
        // получили ошибку 403
        catchError((error) => {
            if(error.status === 403){
                // отправили refreshAndProcced
                return refreshAndProcced(authService, req, next);
            }
            return throwError(() => error);
        })
    );
}

const refreshAndProcced = (
    authService: AuthService,
    req: HttpRequest<any>, 
    next: HttpHandlerFn
) => {
    // рефрешим? нет
    if(!isRefreshing$.value){
        // меняем флаг
        isRefreshing$.next(true);
        // отправили запрос refreshAuthToken()
        return authService.refreshAuthToken().pipe(
            switchMap((res) => {
                return next(addToken(req, res.access_token)).pipe(
                    tap(() => isRefreshing$.next(false))
                )
            })
        )
    }

    // по второму разу идем сюда и возвращаем токен
    if(req.url.includes('refresh')) return next(addToken(req, authService.token!))
 
    return isRefreshing$.pipe(
        filter(isRefreshing => !isRefreshing),
        switchMap(() => {
            return next(addToken(req, authService.token!));
        })
    )
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    }) ;
}