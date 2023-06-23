import {
  ComponentFixture, TestBed
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { addMatchers } from '../../../testing';
import { ListBooksComponent } from './list-books.component';
import { BooksModule } from '../books.module';
import { BooksService } from '../books.service';
import { Pagination } from 'src/app/shared/pagination.model';
import { delay, Observable } from 'rxjs';
import { Book } from '../shared/book.model';
import { PageEvent } from '@angular/material/paginator';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

// const HEROES = getTestHeroes();

let comp: ListBooksComponent;
let fixture: ComponentFixture<ListBooksComponent>;
let mockRouter: any;

const expectedBooks: Book[] = [{
  id: '1',
  title: 'test 1',
  category: 'drama',
  description: '',
  imageUrl: '',
  price: 1,
  quantity: 1
}, {
  id: '2',
  title: 'test 2',
  category: 'drama',
  description: '',
  imageUrl: '',
  price: 2,
  quantity: 2
}];

const expectedPaginationBooks = new Pagination(expectedBooks);

class TestBooksService {
  getBookList(): Observable<any> {
    return new Observable((observer) => observer.next(expectedPaginationBooks)).pipe(delay(1000))
  }

  deleteBook(bookId: string): Observable<any> {
    return new Observable((observer) => observer.next()).pipe(delay(1000))
  }
}

class FakeRouter {
  navigateByUrl(url: string) { return url; }
}

describe('ListBooksComponent', () => {
  /////// Class only //////
  describe('class only', () => {
    let comp: ListBooksComponent;
    let booksService: BooksService;
    let router: Router;

    beforeEach(() => {
      addMatchers();
      router = new FakeRouter() as any as Router;
      booksService = new TestBooksService() as BooksService;
      comp = new ListBooksComponent(booksService);
    });

    it('should NOT have paginationBooks before calling #OnInit', () => {
      expect(comp.paginationBooks.data.length)
        .withContext('should not have paginationBooks before #OnInit')
        .toBe(0);
    });

    it('should NOT have paginationBooks immediately after #OnInit', () => {
      comp.ngOnInit();
      expect(comp.paginationBooks.data.length)
        .withContext('should not have paginationBooks until service promise resolves')
        .toBe(0);
    });

    it('should HAVE paginationBooks after #fetchBookList called', (done: DoneFn) => {
      comp.ngOnInit();
      booksService.getBookList() // the one from getHeroes
        .subscribe({
          next: () => {
            // throw new Error('deliberate error'); // see it fail gracefully
            expect(comp.paginationBooks.data.length)
              .withContext('should have paginationBooks after service promise resolves')
              .toBeGreaterThan(0);
            done();
          },
          error: done.fail
        });
    });

    it('should emit new value after #handlePageEvent called', () => {
      // Set up initial value and subscribe to params$ to capture emitted values
      let emittedValue: { pageIndex: number, pageSize: number } = {
        pageIndex: 0,
        pageSize: 10
      };

      comp.params$.subscribe((value) => {
        emittedValue = value;
      });

      const pageChangedEvent: PageEvent = {
        length: 1,
        pageIndex: 1,
        pageSize: 1,
        previousPageIndex: 0
      };

      // Call page change event
      comp.handlePageEvent(pageChangedEvent);

      // Assert that the emitted value matches the expected value
      expect(emittedValue).toEqual({ pageIndex: 1, pageSize: 1 });
    });

    it('should delete book and reset page to default after #deleteBook called', (done: DoneFn) => {
      const bookId: string = '1';

      let emittedValue: { pageIndex: number, pageSize: number } = {
        pageIndex: 0,
        pageSize: 1
      };

      comp.params$.subscribe((value) => {
        emittedValue = value;
      });

      // Call page change event
      comp.deleteBook(bookId);

      booksService.deleteBook(bookId)
        .subscribe({
          next: () => {
            expect(emittedValue).toEqual({
              pageIndex: 0,
              pageSize: 10
            });
            done();
          },
          error: done.fail
        });

    });
  });

  /////// Shallow Test //////
  describe('shallow test', () => {
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [ListBooksComponent],
        imports: [RouterLink],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideRouter([]),
          { provide: BooksService, useClass: TestBooksService }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).createComponent(ListBooksComponent);

      comp = fixture.componentInstance;
    });

    it('should display empty book list', () => {
      comp.paginationBooks = new Pagination<Book>();
      fixture.detectChanges();

      const bookListElement: HTMLElement = fixture.nativeElement.querySelector('mat-nav-list');
      expect(bookListElement.childElementCount).toEqual(0);
    });

    it('should display book list', () => {
      comp.paginationBooks = expectedPaginationBooks;
      fixture.detectChanges();

      const bookListElement: HTMLElement = fixture.nativeElement.querySelector('mat-nav-list');
      expect(bookListElement.childElementCount).toBeGreaterThan(0);
    });

    it('should call #deleteBook after clicked', () => {
      comp.paginationBooks = expectedPaginationBooks;
      fixture.detectChanges();

      const bookListElement: HTMLElement = fixture.nativeElement.querySelector('mat-nav-list');
      const bookElement: Element = bookListElement.children.item(0) as Element;
      const deleteButton: HTMLElement = bookElement.querySelector('button[color=accent]') as HTMLElement;
      const deleteFnSpy = spyOn(comp, 'deleteBook');
      deleteButton.click();

      // Expect count times
      expect(deleteFnSpy.calls.count()).toEqual(1);

      // Expect count params
      expect(deleteFnSpy.calls.mostRecent().args[0]).toEqual('1');
    });
  });

});

