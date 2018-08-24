import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { AuthService } from '../auth.service';
import { FinalOrder } from '../models/finalorder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  cart: ShoppingCart;  
  totalAmount: number; 
  orderItems: Order[];
  userId: string;    
  tPrice: number;
  tQuantity: number;

  checkOutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)    
  });

  constructor(
          private router: Router,
          private authService: AuthService,
          private cartService: ShoppingCartService,
          private orderService: OrderService) { }

  ngOnInit() {    
    this.subscription = this.cartService.getCart().snapshotChanges().subscribe(cart => {
      this.cart = cart.payload.toJSON() as ShoppingCart;  
      this.getItems();
    });
    this.subscription = this.authService.user$.subscribe(user =>{
      this.userId = user.uid;
    }) 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  saveOrder(checkOutForm){
    let finalOrder = new FinalOrder(this.userId,checkOutForm,this.getItems());       
    let result = this.orderService.placeOrder(finalOrder);    
    this.router.navigate(['/order-success',result.key]);
  }

  getItems(){
    this.tQuantity = 0;
    this.tPrice = 0;
    this.totalAmount = 0;
    this.orderItems = [];
    let cartItems = this.cart.items;
        
    for(let productId in cartItems){
      let product = cartItems[productId].product;
      let price = +cartItems[productId].product.price;
      let quantity = +cartItems[productId].quantity;

      product['title'] = cartItems[productId].product.title;
      product['imageUrl'] = cartItems[productId].product.imageUrl;      
      product['price'] = price; 
      product['quantity'] = quantity
      product['totalAmount'] = price*quantity;
      this.tPrice += price*quantity;
      this.tQuantity += quantity;

      this.orderItems.push(product as Order);            
    }     
    
    return this.orderItems;      
  }

}
