import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  
  appUser: AppUser;
  shoppingCartItemCount: number;  

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {     
  }

  logout(){
    this.auth.logout();
  }

  ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
            
    this.cartService.getCart().snapshotChanges().subscribe(cart =>{      
      this.shoppingCartItemCount = 0;  
      let cartItems = cart.payload.toJSON() as ShoppingCart;      
        for(let productID in cartItems.items){        
          this.shoppingCartItemCount += cartItems.items[productID].quantity;          
        }                   
    });    
  }

}
