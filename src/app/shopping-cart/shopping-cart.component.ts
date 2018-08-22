import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';


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

  clearCart(){
    this.cartService.clearCart();
  }

  getCart(){
    this.cartService.getCart().snapshotChanges().subscribe(cart =>{  
      this.totalAmount = 0;    
      this.shoppingCartItemCount = 0; 
      
      if(null === cart.key) return 0;

      let carts = cart.payload.toJSON() as ShoppingCart;
      this.cartItems = carts.items;         
      for(let productId in this.cartItems){
        this.productIds.push(productId);
        let price = this.cartItems[productId].product.price;
        let quantity = this.cartItems[productId].quantity;              
        this.totalAmount += +price*quantity;                                  
        this.shoppingCartItemCount += quantity;          
      }             
    });
  }

  ngOnInit() {        
   this.getCart();
  }

}
