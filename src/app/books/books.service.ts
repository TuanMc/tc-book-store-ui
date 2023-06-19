import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/pagination.model';
import { Book } from './shared/book.model';

@Injectable()
export class BooksService {
  constructor(private httpClient: HttpClient) { }

  getBookList(page?: number, limit?: number): Observable<Pagination<Book>> {

    let params = new HttpParams();
    if (page) params = params.append('page', page);
    if (limit) params = params.append('limit', limit);

    return this.httpClient.get<Pagination<Book>>("http://localhost:3000/api/books", { params });
  }

  getBookDetails(bookId: String): Observable<Book> {
    return this.httpClient.get<Book>(`http://localhost:3000/api/books/${bookId}`);
  }

  addBook(newBook: any): Observable<any> {
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('description', newBook.description);
    formData.append('image', newBook.imageUrl, newBook.imageUrl.name);
    formData.append('category', newBook.category);
    formData.append('price', newBook.price);
    formData.append('quantity', newBook.quantity);

    return this.httpClient.post(`http://localhost:3000/api/books/`, formData);
  }

  deleteBook(bookId: String): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/api/books/${bookId}`);
  }
}
