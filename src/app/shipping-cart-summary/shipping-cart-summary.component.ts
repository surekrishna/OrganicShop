import { Component, Input } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'shipping-cart-summary',
  templateUrl: './shipping-cart-summary.component.html',
  styleUrls: ['./shipping-cart-summary.component.css']
})
export class ShippingCartSummaryComponent {

  @Input('orderItems') orderItems: Order[];
  @Input('tQuantity') tQuantity: number;
  @Input('tPrice') tPrice: number;  

}
