import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
 
  productList: Product[]; 
  filteredProducts: Product[];
  subscription: Subscription; 
  
  constructor(private productService: ProductService) {
    this.filteredProducts = this.productList =  this.getProductList();    
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

  filter(query: string){    
    this.filteredProducts = (query) 
    ? this.productList.filter(product => product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) 
    : this.productList;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
