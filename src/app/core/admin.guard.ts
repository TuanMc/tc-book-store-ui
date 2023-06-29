import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private keycloakService: KeycloakService, private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const isAdmin = this.keycloakService.getUserRoles().some((role) => role === 'default-roles-book-store');
    if (!isAdmin) {
      this.router.navigate(['unauthorized']);
      return isAdmin;
    }

    return true;
  }
}
