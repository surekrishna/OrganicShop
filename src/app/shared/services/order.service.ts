import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
          private db: AngularFireDatabase,
          private cartService: ShoppingCartService) { }

  placeOrder(order){
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrderList(){
    return this.db.list('/orders');
  }
}
