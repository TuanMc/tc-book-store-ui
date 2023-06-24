import { KeycloakService } from 'keycloak-angular';
import { Component } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { CartService } from './cart/cart.service';
import { Cart } from './cart/shared/cart.model';
import { Book } from './books/shared/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tc-book-store-ui';
  isLoggedIn = false;
  userProfile: KeycloakProfile | null = null;
  cart: Cart<Book> = new Cart();

  constructor(private readonly keycloak: KeycloakService, private cartService: CartService) { }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.cart = this.cartService.cart;

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
