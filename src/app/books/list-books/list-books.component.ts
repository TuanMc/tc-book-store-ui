import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'list-books',
  templateUrl: 'list-books.component.html',
  styleUrls: ['list-books.component.scss']
})

export class ListBooksComponent implements OnInit {
  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBookList().subscribe(data => console.log(data));
  }
}
