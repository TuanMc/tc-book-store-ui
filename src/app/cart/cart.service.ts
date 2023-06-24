import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart, CartItem } from './shared/cart.model';
import { Book } from '../books/shared/book.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart$: Subject<{ type: string, item?: CartItem<Book> }> = new Subject();
  cart: Cart<Book> = new Cart();

  constructor() {
    this.cart$.subscribe(({ type, item }) => {
      if (type === 'add' && item)
        this.cart.addItem(item);

      if (type === 'reset')
        this.cart.reset();
    });
  }

  addItem(item: CartItem<Book>): void {
    this.cart$.next({ type: 'add', item });
  }

  checkout(): void {
    this.cart$.next({ type: 'reset' })
  }
}
