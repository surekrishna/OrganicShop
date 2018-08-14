import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {

  productList: Product[]; 
  filteredProducts: Product[];
  subscription: Subscription;   
  category: string;
  
  constructor(private productService: ProductService, private route: ActivatedRoute) { 
    this.productList =  this.getProductList();         
  }

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
          
          this.filteredProducts = (this.category) 
          ? this.productList.filter(product => product.category == this.category) 
          : this.productList;
        }); 
      });
    });
    
    return this.productList;     
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
