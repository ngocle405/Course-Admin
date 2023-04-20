import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      var userId = JSON.parse(sessionStorage.getItem('admin') || '{}');
      console.log(userId);
      
      if (userId.id !== null) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  }