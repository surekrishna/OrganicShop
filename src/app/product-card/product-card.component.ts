import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;  
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){        
    this.updateItemQuantity(this.product,1);
  }

  getQuantity(){  
    //if(!this.shoppingCart || null === this.shoppingCart.key) return 0;      
    if(!this.shoppingCart || null === this.shoppingCart.key || !this.shoppingCart.payload.toJSON().items) return 0;    
    
    let item = this.shoppingCart.payload.toJSON().items[this.product.$key];   
    return item ? item.quantity : 0;
  }

  updateItemQuantity(product: Product, change: number){
    let items$ = this.cartService.addToCart(product);
    this.subscription = items$.snapshotChanges().subscribe(item =>{           
      if(item.payload.exists()){
        let qty = item.payload.toJSON();  
        items$.update({quantity: +qty['quantity'] + change});  
        this.subscription.unsubscribe();      
      } else{                
        items$.set({ quantity: 1,
          product:{title: product.title,price: product.price,category: product.category,imageUrl: product.imageUrl}
        });
        this.subscription.unsubscribe();
      } 
    });
  }

}
