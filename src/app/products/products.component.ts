import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productList: Product[]; 
  filteredProducts: Product[];
  subscription: Subscription;   
  category: string;
  cart;
  
  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private cartService: ShoppingCartService) { }

  getProductList(){    
    this.productList = [];
    this.filteredProducts = [];
    this.subscription = this.productService.getAllProducts().snapshotChanges().subscribe(products =>{        
      products.forEach(product =>{
        let jProduct = product.payload.toJSON();
        jProduct['$key'] = product.key;
        this.productList.push(jProduct as Product); 
        
        this.route.queryParamMap.subscribe(params =>{
          this.category = params.get('category');
          
          this.applyFilter();
        }); 
      });
    });
    
    return this.productList;     
  }

  private applyFilter(){
    this.filteredProducts = (this.category) 
    ? this.productList.filter(product => product.category == this.category) 
    : this.productList;
  }

  ngOnInit(){
    this.subscription = this.cartService.getCart().snapshotChanges().subscribe(cart =>{
        this.cart = cart;        
    });    
    this.productList =  this.getProductList();  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
