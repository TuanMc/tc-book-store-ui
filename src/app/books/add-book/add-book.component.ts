import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-book',
  templateUrl: 'add-book.component.html',
  styleUrls: ['add-book.component.scss']
})

export class AddBookComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', { validators: Validators.required }),
    imageUrl: new FormControl<any>(null, { validators: Validators.required }),
    category: new FormControl('', { validators: Validators.required }),
    quantity: new FormControl(0, { validators: Validators.required }),
    price: new FormControl(0, { validators: Validators.required }),
    description: new FormControl('', { validators: Validators.required }),
  });

  constructor(private booksService: BooksService) { }

  ngOnInit() { }

  handleSubmit(): void {
    console.log(this.form.value);
    this.booksService.addBook(this.form.value).subscribe(res => console.log(res));
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const fileName = file.name;
      console.log(fileName);
      this.form.patchValue({
        imageUrl: file
      });
    }
  }
}
