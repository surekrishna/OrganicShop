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

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {        
    this.cartService.getCart().snapshotChanges().subscribe(cart =>{      
      this.shoppingCartItemCount = 0;  
      let carts = cart.payload.toJSON() as ShoppingCart;
      this.cartItems = carts.items;         
      for(let productId in this.cartItems){
        this.productIds.push(productId);                            
        this.shoppingCartItemCount += this.cartItems[productId].quantity;          
      }             
    });
  }

}
