import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {

  productList: Product[]; 
  subscription: Subscription; 
  
  constructor(private productService: ProductService) { 
    this.productList =  this.getProductList();    
  }

  getProductList(){    
    this.productList = [];
    this.subscription = this.productService.getAllProducts().snapshotChanges().subscribe(products =>{        
      products.forEach(product =>{
        let jProduct = product.payload.toJSON();
        jProduct['$key'] = product.key;
        this.productList.push(jProduct as Product);        
      });
    });
    
    return this.productList;     
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
