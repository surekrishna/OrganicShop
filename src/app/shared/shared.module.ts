import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { UserService } from 'shared/services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,   
    UserService,
    ProductService,
    OrderService    
  ]
})
export class SharedModule { }
