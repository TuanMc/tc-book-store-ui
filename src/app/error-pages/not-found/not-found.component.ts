import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tc-bs-not-found',
  template: `
  <button mat-button color="warn" routerLink="..">Back</button>
  <h1>Not Found</h1>
  `
})

export class NotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
