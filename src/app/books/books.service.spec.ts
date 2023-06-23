import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BooksService } from './books.service';
import { Book, NewBook } from './shared/book.model';
import { Pagination } from '../shared/pagination.model';
import { asyncData } from 'src/testing/async-observable-helpers';

describe('BooksService', () => {
  describe('BooksService (with spies)', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let booksService: BooksService;

    beforeEach(() => {
      // TODO: spy on other methods too
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      booksService = new BooksService(httpClientSpy);
    });

    it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
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

      const expectedPaginationBooks: Pagination<Book> = new Pagination(expectedBooks);

      httpClientSpy.get.and.returnValue(asyncData(expectedPaginationBooks));

      booksService.getBookList().subscribe({
        next: books => {
          expect(books)
            .withContext('expected books')
            .toEqual(expectedPaginationBooks);
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.get.calls.count())
        .withContext('one call')
        .toBe(1);
    });
  });

  describe('BooksService (with mocks)', () => {
    let httpTestingController: HttpTestingController;
    let booksService: BooksService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [HttpClientTestingModule],
        // Provide the service-under-test
        providers: [BooksService]
      });

      // Inject the http, test controller, and service-under-test
      // as they will be referenced by each test.
      httpTestingController = TestBed.inject(HttpTestingController);
      booksService = TestBed.inject(BooksService);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    /// booksService method tests begin ///
    describe('#getBookList', () => {
      let expectedPaginationBooks: Pagination<Book>;

      beforeEach(() => {
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

        expectedPaginationBooks = new Pagination(expectedBooks);
      });

      it('should return expected books (called once)', () => {
        booksService.getBookList().subscribe({
          next: heroes => expect(heroes)
            .withContext('should return expected heroes')
            .toEqual(expectedPaginationBooks),
          error: fail
        });

        // booksService should have made one request to GET heroes from expected URL
        const req = httpTestingController.expectOne('http://localhost:3000/api/books');
        expect(req.request.method).toEqual('GET');

        // Respond with the mock heroes
        req.flush(expectedPaginationBooks);
      });

      it('should make a call to page 1 and limit 10 (called once)', () => {
        const page = 1;
        const limit = 10;
        booksService.getBookList(page, limit).subscribe({
          next: heroes => expect(heroes)
            .withContext('should return expected heroes')
            .toEqual(expectedPaginationBooks),
          error: fail
        });

        // booksService should have made one request to GET heroes from expected URL
        const req = httpTestingController.expectOne(`http://localhost:3000/api/books?page=${page}&limit=${limit}`);
        expect(req.request.method).toEqual('GET');

        // Respond with the mock heroes
        req.flush(expectedPaginationBooks);
      })
    });

    describe('#getBookDetails', () => {
      let expectedBook: Book;

      beforeEach(() => {
        expectedBook = {
          id: '1',
          title: 'test 1',
          category: 'drama',
          description: '',
          imageUrl: '',
          price: 1,
          quantity: 1
        };
      });

      it('should return expected book (called once)', () => {
        booksService.getBookDetails('1').subscribe({
          next: book => expect(book)
            .withContext('should return expected book')
            .toEqual(book),
          error: fail
        });

        // booksService should have made one request to GET heroes from expected URL
        const req = httpTestingController.expectOne('http://localhost:3000/api/books/1');
        expect(req.request.method).toEqual('GET');

        // Respond with the mock heroes
        req.flush(expectedBook);
      });
    });

    describe('#deleteBook', () => {
      it('should delete book (called once)', () => {
        const bookId = '1';
        booksService.deleteBook(bookId).subscribe({
          next: (res) => expect(res)
            .withContext('should delete book')
            .toEqual(''),
          error: fail
        });

        // booksService should have made one request to GET heroes from expected URL
        const req = httpTestingController.expectOne(`http://localhost:3000/api/books/${bookId}`);
        expect(req.request.method).toEqual('DELETE');

        // Respond with the mock heroes
        req.flush('');
      });
    });

    describe('#addBook', () => {
      let newBook: NewBook;

      beforeEach(() => {
        newBook = new NewBook({
          title: 'test 1',
          category: 'drama',
          description: '',
          image: new File([new Blob()], 'test.png'),
          price: 1,
          quantity: 1
        });
      });

      it('should add a book and return it', () => {
        booksService.addBook(newBook).subscribe({
          next: res => expect(res)
            .withContext('should return the hero')
            .toEqual(''),
          error: fail
        });

        // booksService should have made one request to POST book

        const formData = new FormData();
        formData.append('title', newBook.title);
        formData.append('description', newBook.description);
        formData.append('image', (newBook.image as File), (newBook.image as File).name);
        formData.append('category', newBook.category);
        formData.append('price', newBook.price.toString());
        formData.append('quantity', newBook.quantity.toString());

        const req = httpTestingController.expectOne('http://localhost:3000/api/books/');
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(formData);

        // Expect server to return the hero after POST
        const expectedResponse = new HttpResponse(
          { status: 201, statusText: 'Created', body: '' });
        req.event(expectedResponse);
      });
    });
  });
});
