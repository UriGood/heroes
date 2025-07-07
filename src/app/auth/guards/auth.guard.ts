import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => console.log('Authenticated: ', isAuthenticated)),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['./auth/login']);
      }
    })
  );
};
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanMatch, CanActivate{

//     constructor(
//         private authService:AuthService,
//         private router: Router
//     ){}
//     private checkAuthStatus(): boolean | Observable<boolean>{
//         return this.authService.checkAuthentication()
//         .pipe(
//             tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated) ),
//             tap( isAuthenticated => {
//                 if(!isAuthenticated){
//                     this.router.navigate(['./auth/login'])
//                 }
//             }),

//         );
//     }

//     canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean>  {
//         // console.log('Can Match');
//         // console.log({ route, segments });

//         return this.checkAuthStatus();
//     }
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
//         // console.log('Can activated');
//         // console.log({ route, state });

//         return this.checkAuthStatus();
//     }

// }
