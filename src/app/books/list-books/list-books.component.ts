import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Pagination } from 'src/app/shared/pagination.model';
import { Book } from '../shared/book.model';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'list-books',
  templateUrl: 'list-books.component.html',
  styleUrls: ['list-books.component.scss']
})

export class ListBooksComponent implements OnInit {
  paginationBooks: Pagination<Book> = new Pagination<Book>();
  params$: BehaviorSubject<{ pageIndex: number, pageSize: number }> = new BehaviorSubject({ pageIndex: 0, pageSize: 10 });

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.params$.subscribe(({ pageIndex, pageSize }) => {
      console.log("fetch params", pageIndex, pageSize);
      this.fetchBookList(pageIndex + 1, pageSize)
    });
  }

  fetchBookList(page?: number, limit?: number): void {
    this.booksService.getBookList(page, limit).subscribe(res => {
      console.log(res);
      this.paginationBooks = res;
    });
  }

  handlePageEvent(ev: PageEvent): void {
    const { pageIndex, pageSize } = ev;
    this.params$.next({ pageIndex, pageSize });
  }

  deleteBook(bookId: String): void {
    this.booksService.deleteBook(bookId).subscribe(() => {
      console.log("Booked deleted!");
      this.params$.next({ pageIndex: 0, pageSize: 10 });
    });
  }
}
