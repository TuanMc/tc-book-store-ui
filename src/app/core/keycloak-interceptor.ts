import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {
  constructor(private readonly keycloakService: KeycloakService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the Keycloak access token from the Keycloak instance
    const accessToken = this.keycloakService.getKeycloakInstance().token;

    if (accessToken) {
      // Clone the request and add the access token to the Authorization header
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // Pass the modified request to the next interceptor or the HTTP handler
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
