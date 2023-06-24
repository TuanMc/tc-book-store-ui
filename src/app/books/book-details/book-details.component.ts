import { CartService } from './../../cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book.model';
import { CartItem } from 'src/app/cart/shared/cart.model';

@Component({
  selector: 'tc-bs-book-details',
  templateUrl: 'book-details.component.html',
  styleUrls: ['book-details.component.scss']
})

export class BookDetailsComponent implements OnInit {
  bookId: string;
  bookDetails: Book = new Book();

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private cartService: CartService) {
    this.bookId = this.route.snapshot.paramMap.get("bookId") || '';
  }

  ngOnInit() {
    this.booksService.getBookDetails(this.bookId).subscribe(res => {
      this.bookDetails = new Book(res);
    });
  }

  handleAddToCart(): void {
    this.cartService.addItem(new CartItem(this.bookId, this.bookDetails, 1, this.bookDetails.price));
  }
}
