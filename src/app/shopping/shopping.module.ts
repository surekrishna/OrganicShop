import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingCartSummaryComponent } from './components/shipping-cart-summary/shipping-cart-summary.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //It looks like you're using ngModel (ReactiveFormsModule) on the same form field as formControlName. Support for using the ngModel input property and ngModelChange event with reactive form directives has been deprecated in Angular v6 and will be removed in Angular v7
    //For more information on this, see our API docs here: https://angular.io/api/forms/FormControlName#use-with-ngmodel
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
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
