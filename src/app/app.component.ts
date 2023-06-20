import { KeycloakService } from 'keycloak-angular';
import { Component } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tc-book-store-ui';
  isLoggedIn = false;
  userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) { }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
