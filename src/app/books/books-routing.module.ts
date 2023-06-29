import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './list-books/list-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AdminGuard } from '../core/admin.guard';
import { AuthorizedGuard } from '../core/authorized.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListBooksComponent,
    title: 'List Book'
  },
  {
    path: 'add',
    pathMatch: 'full',
    canActivate: [AuthorizedGuard, AdminGuard],
    component: AddBookComponent,
    title: 'Add Book',
  },
  {
    path: ':bookId',
    pathMatch: 'full',
    canActivate: [AuthorizedGuard],
    component: BookDetailsComponent,
    title: 'Book Details'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
