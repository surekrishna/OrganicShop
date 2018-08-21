import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  

  constructor(private db: AngularFireDatabase) { }

  private createCart(){
    return this.db.list('/shopping-carts').push({
        dateCreated: new Date().getTime()
    });
  }

  getCart(){
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);
  }

  private getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = this.createCart();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  addToCart(product: Product){
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key);
  }
  

}
