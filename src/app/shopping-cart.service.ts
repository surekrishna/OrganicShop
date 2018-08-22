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

  addToCart(product: Product){
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key);
  }

  getCart(){
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);
  }

  getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = this.createCart();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  clearCart(){
    let cartId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items/').remove();
  }

  removeItem(productId: string){
    let cartId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items/'+productId).remove();
  }

}
