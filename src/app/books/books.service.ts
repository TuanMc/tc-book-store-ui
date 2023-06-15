import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/pagination.model';
import { Book } from './shared/book.model';

@Injectable()
export class BooksService {
  constructor(private httpClient: HttpClient) { }

  getBookList(): Observable<Pagination<Book>> {
    return this.httpClient.get<Pagination<Book>>("http://localhost:3000/api/books?limit=20");
  }

}
