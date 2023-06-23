import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private keycloakService: KeycloakService) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.keycloakService.getKeycloakInstance().authenticated) {
      this.keycloakService.login();
      return false;
    }

    return true;
  }
}
