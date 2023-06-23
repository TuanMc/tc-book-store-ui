import {
  ComponentFixture, fakeAsync, TestBed, tick, waitForAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { addMatchers } from '../../../testing';
import { ListBooksComponent } from './list-books.component';
import { BooksModule } from '../books.module';
import { BooksService } from '../books.service';
import { Pagination } from 'src/app/shared/pagination.model';
import { delay, Observable } from 'rxjs';
import { Book } from '../shared/book.model';
import { PageEvent } from '@angular/material/paginator';

// const HEROES = getTestHeroes();

let comp: ListBooksComponent;
let fixture: ComponentFixture<ListBooksComponent>;
// let page: Page;

class TestBooksService {
  getBookList(): Observable<any> {
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

    return new Observable((observer) => observer.next(expectedPaginationBooks)).pipe(delay(1000))
  }

  deleteBook(bookId: string): Observable<any> {
    return new Observable((observer) => observer.next()).pipe(delay(1000))
  }
}

class FakeRouter {
  navigateByUrl(url: string) { return url; }
}

/////// Class only //////
describe('ListBooksComponent class only', () => {
  let comp: ListBooksComponent;
  let booksService: BooksService;
  let router: Router;

  beforeEach(() => {
    addMatchers();
    router = new FakeRouter() as any as Router;
    booksService = new TestBooksService() as BooksService;
    comp = new ListBooksComponent(booksService);
  });

  it('should NOT have paginationBooks before calling OnInit', () => {
    expect(comp.paginationBooks.data.length)
      .withContext('should not have paginationBooks before OnInit')
      .toBe(0);
  });

  it('should NOT have paginationBooks immediately after OnInit', () => {
    comp.ngOnInit();
    expect(comp.paginationBooks.data.length)
      .withContext('should not have paginationBooks until service promise resolves')
      .toBe(0);
  });

  it('should HAVE paginationBooks after BooksService gets them', (done: DoneFn) => {
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

  it('should update paginationBooks when page changed', () => {
    const pageChangedEvent: PageEvent = {
      length: 1,
      pageIndex: 1,
      pageSize: 1,
      previousPageIndex: 0
    };

    // Create spy on fetchBookList function to test whether the function is called with correct params
    const spy = spyOn(comp, 'fetchBookList');

    // Call page change event
    comp.handlePageEvent(pageChangedEvent);

    const fetchBookArgs = spy.calls.mostRecent().args;

    expect(comp.paginationBooks.page)
      .withContext('should update current page of paginationBooks after page changed')
      .toBe(2);

    expect(fetchBookArgs)
      .withContext('should call function fetchBookList with updated page & limit')
      .toEqual([2, 1]);
  });

  it('should update paginationBooks when page changed', () => {
    const pageChangedEvent: PageEvent = {
      length: 1,
      pageIndex: 1,
      pageSize: 1,
      previousPageIndex: 0
    };

    // Create spy on fetchBookList function to test whether the function is called with correct params
    const spy = spyOn(comp, 'fetchBookList');

    // Call page change event
    comp.handlePageEvent(pageChangedEvent);

    const fetchBookArgs = spy.calls.mostRecent().args;

    expect(comp.paginationBooks.page)
      .withContext('should update current page of paginationBooks after page changed')
      .toBe(2);

    expect(fetchBookArgs)
      .withContext('should call function fetchBookList with updated page & limit')
      .toEqual([2, 1]);
  });


  it('should delete book', (done: DoneFn) => {
    const bookId: string = '1';
    // Create spy on fetchBookList function to test whether the function is called
    const spy = spyOn(comp, 'fetchBookList');

    // Call page change event
    comp.deleteBook(bookId);

    const fetchBookCount = spy.calls.count();
    
    expect(fetchBookCount)
      .withContext('should call fetchBookList after delete')
      .toEqual(1);
  });

  // it('should tell ROUTER to navigate by hero id', () => {
  //   const hero: Hero = { id: 42, name: 'Abbracadabra' };
  //   const spy = spyOn(router, 'navigateByUrl');

  //   comp.gotoDetail(hero);

  //   const navArgs = spy.calls.mostRecent().args[0];
  //   expect(navArgs)
  //     .withContext('should nav to HeroDetail for Hero 42')
  //     .toBe('/heroes/42');
  // });

});

/////// Tests //////

// describe('ListBooksComponent', () => {
//   beforeEach(waitForAsync(() => {
//     addMatchers();
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed
//       .configureTestingModule({
//         imports: [BooksModule],
//         providers: [
//           { provide: BooksService, useClass: TestBooksService },
//           { provide: Router, useValue: routerSpy }
//         ]
//       })
//       .compileComponents()
//       .then(createComponent);
//   }));

//   it('should display books', () => {
//     expect(page.heroRows.length).toBeGreaterThan(0);
//   });

//   // it('1st hero should match 1st test hero', () => {
//   //   const expectedHero = HEROES[0];
//   //   const actualHero = page.heroRows[0].textContent;
//   //   expect(actualHero)
//   //     .withContext('hero.id')
//   //     .toContain(expectedHero.id.toString());
//   //   expect(actualHero)
//   //     .withContext('hero.name')
//   //     .toContain(expectedHero.name);
//   // });

//   // it('should select hero on click', fakeAsync(() => {
//   //      const expectedHero = HEROES[1];
//   //      const btn = page.heroRows[1].querySelector('button');

//   //      btn!.dispatchEvent(new Event('click'));
//   //      tick();
//   //      // `.toEqual` because selectedHero is clone of expectedHero; see FakeBooksService
//   //      expect(comp.selectedHero).toEqual(expectedHero);
//   //    }));

//   // it('should navigate to selected hero detail on click', fakeAsync(() => {
//   //      const expectedHero = HEROES[1];
//   //      const btn = page.heroRows[1].querySelector('button');

//   //      btn!.dispatchEvent(new Event('click'));
//   //      tick();

//   //      // should have navigated
//   //      expect(page.navSpy.calls.any())
//   //       .withContext('navigate called')
//   //       .toBe(true);

//   //      // composed hero detail will be URL like 'heroes/42'
//   //      // expect link array with the route path and hero id
//   //      // first argument to router.navigate is link array
//   //      const navArgs = page.navSpy.calls.first().args[0];
//   //      expect(navArgs[0])
//   //       .withContext('nav to heroes detail URL')
//   //       .toContain('heroes');
//   //      expect(navArgs[1])
//   //       .withContext('expected hero.id')
//   //       .toBe(expectedHero.id);
//   //    }));

//   // it('should find `HighlightDirective` with `By.directive', () => {
//   //   // Can find DebugElement either by css selector or by directive
//   //   const h2 = fixture.debugElement.query(By.css('h2'));
//   //   const directive = fixture.debugElement.query(By.directive(HighlightDirective));
//   //   expect(h2).toBe(directive);
//   // });

//   // it('should color header with `HighlightDirective`', () => {
//   //   const h2 = page.highlightDe.nativeElement as HTMLElement;
//   //   const bgColor = h2.style.backgroundColor;

//   //   // different browsers report color values differently
//   //   const isExpectedColor = bgColor === 'gold' || bgColor === 'rgb(255, 215, 0)';
//   //   expect(isExpectedColor)
//   //     .withContext('backgroundColor')
//   //     .toBe(true);
//   // });

//   // it("the `HighlightDirective` is among the element's providers", () => {
//   //   expect(page.highlightDe.providerTokens)
//   //     .withContext('HighlightDirective')
//   //     .toContain(HighlightDirective);
//   // });
// });

/////////// Helpers /////

/** Create the component and set the `page` test variables */
// function createComponent() {
//   fixture = TestBed.createComponent(ListBooksComponent);
//   comp = fixture.componentInstance;

//   // change detection triggers ngOnInit which gets a hero
//   fixture.detectChanges();

//   return fixture.whenStable().then(() => {
//     // got the heroes and updated component
//     // change detection updates the view
//     fixture.detectChanges();
//     // page = new Page();
//   });
// }

// class Page {
//   /** Hero line elements */
//   heroRows: HTMLLIElement[];

//   /** Highlighted DebugElement */
//   highlightDe: DebugElement;

//   /** Spy on router navigate method */
//   navSpy: jasmine.Spy;

//   constructor() {
//     const heroRowNodes = fixture.nativeElement.querySelectorAll('li');
//     this.heroRows = Array.from(heroRowNodes);

//     // Find the first element with an attached HighlightDirective
//     this.highlightDe = fixture.debugElement.query(By.directive(HighlightDirective));

//     // Get the component's injected router navigation spy
//     const routerSpy = fixture.debugElement.injector.get(Router);
//     this.navSpy = routerSpy.navigate as jasmine.Spy;
//   }
// }
