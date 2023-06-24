import { NgModule } from '@angular/core';

import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CartRoutingModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,],
  exports: [],
  declarations: [CartComponent],
  providers: [],
})
export class CartModule { }
