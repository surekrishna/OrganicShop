import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingCartSummaryComponent } from './components/shipping-cart-summary/shipping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  imports: [    
    SharedModule,
    RouterModule.forChild([     
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},     
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]}
    ])
  ],
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,   
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductFilterComponent, 
    ShippingCartSummaryComponent
  ]
})
export class ShoppingModule { }
