import { NgModule } from '@angular/core';
import { BooksService } from './books.service';
import { ListBooksComponent } from './list-books/list-books.component';
import { BooksRoutingModule } from './books-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [BooksRoutingModule, SharedModule],
  exports: [],
  declarations: [ListBooksComponent, AddBookComponent, BookDetailsComponent],
  providers: [BooksService],
})
export class BooksModule { }
