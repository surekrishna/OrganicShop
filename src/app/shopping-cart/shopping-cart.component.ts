import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  cartItems;
  productIds = [];
  shoppingCartItemCount: number; 
  totalAmount: number; 
  

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {        
    this.getCart();
   }

  clearCart(){
    this.cartService.clearCart();
  }

  getCart(){
    this.cartService.getCart().snapshotChanges().subscribe(cart =>{  
      this.totalAmount = 0;    
      this.shoppingCartItemCount = 0;
      this.cartItems = null; 
      
      if(null === cart.key) return 0;

      let carts = cart.payload.toJSON() as ShoppingCart;
      this.cartItems = carts.items;         
      for(let productId in this.cartItems){
        this.productIds.push(productId);
        let price = this.cartItems[productId].product.price;
        let quantity = this.cartItems[productId].quantity; 

        if(quantity === 0) this.cartService.removeItem(productId);

        this.totalAmount += +price*quantity;                                  
        this.shoppingCartItemCount += quantity;          
      }             
    });
  }
  
}
