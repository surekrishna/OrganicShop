import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';


@NgModule({
  imports: [
    CommonModule,    
    FormsModule,    
    //It looks like you're using ngModel (ReactiveFormsModule) on the same form field as formControlName. Support for using the ngModel input property and ngModelChange event with reactive form directives has been deprecated in Angular v6 and will be removed in Angular v7
    //For more information on this, see our API docs here: https://angular.io/api/forms/FormControlName#use-with-ngmodel
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/:$key', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]}      
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ]
})
export class AdminModule { }
