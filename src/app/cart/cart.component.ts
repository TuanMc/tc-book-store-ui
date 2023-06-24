import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from './shared/cart.model';
import { Book } from '../books/shared/book.model';

@Component({
  selector: 'tc-bs-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss'],
})

export class CartComponent implements OnInit {
  cart: Cart<Book> = new Cart();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.cart;
  }

  handleCheckout(): void {
    this.cartService.checkout();
    alert("Thank you for your payment");
  }
}
