import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tc-bs-unauthorized',
  template: `
  <button mat-button color="warn" routerLink="..">Back</button>
  <h1>Unauthorized user</h1>
  `
})

export class UnauthorizedComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
