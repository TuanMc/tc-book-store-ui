import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Pagination } from 'src/app/shared/pagination.model';
import { Book } from '../shared/book.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'list-books',
  templateUrl: 'list-books.component.html',
  styleUrls: ['list-books.component.scss']
})

export class ListBooksComponent implements OnInit {
  paginationBooks: Pagination<Book> = new Pagination<Book>();
  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.fetchBookList();
  }

  fetchBookList(page?: number, limit?: number): void {
    this.booksService.getBookList(page, limit).subscribe(res => {
      console.log(res);
      this.paginationBooks = res;
    });
  }

  handlePageEvent(ev: PageEvent): void {
    const page = ev.pageIndex + 1;
    const limit = ev.pageSize;

    this.paginationBooks.page = page;
    this.fetchBookList(page, limit);
  }

  deleteBook(bookId: String): void {
    this.booksService.deleteBook(bookId).subscribe(() => {
      console.log("Booked deleted!");
      this.fetchBookList();
    });
  }
}
