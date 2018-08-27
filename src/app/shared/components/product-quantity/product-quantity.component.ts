import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;  
  @Input('shopping-cart') shoppingCart;  
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){        
    this.updateItemQuantity(this.product,1);
  }

  removeFromCart(){
    this.updateItemQuantity(this.product,-1);
  }

  getQuantity(){       
    if(!this.shoppingCart) return 0;
    
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
