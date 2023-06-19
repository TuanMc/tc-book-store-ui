import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book.model';

@Component({
  selector: 'book-details',
  templateUrl: 'book-details.component.html',
  styleUrls: ['book-details.component.scss']
})

export class BookDetailsComponent implements OnInit {
  bookId: String;
  bookDetails: Book = new Book();

  constructor(private route: ActivatedRoute, private booksService: BooksService) {
    this.bookId = this.route.snapshot.paramMap.get("bookId") || '';
  }

  ngOnInit() {
    this.booksService.getBookDetails(this.bookId).subscribe(res => {
      this.bookDetails = new Book(res);
    });
  }

  handleAddToCart(): void {
    // this.bookDetails.addToCart(this.bookId).subscribe(res => {
    //   console.log(res);
    // });
  }
}
