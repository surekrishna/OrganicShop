import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
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
  categoryList: Category[];
  category: string;ActivatedRoute
  
  constructor(private productService: ProductService, private route: ActivatedRoute) { 
    this.productList =  this.getProductList(); 
    this.categoryList = this.getCategories();
    this.getParams();   
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

  getCategories(){   
    this.categoryList = [];
    this.subscription =  this.productService.getCategories().snapshotChanges().subscribe(categories =>{
      categories.forEach(category =>{              
        let jCategory = category.payload.toJSON();          
        jCategory['key'] = category.payload.key;                        
        this.categoryList.push(jCategory as Category);
      });
    });
    return this.categoryList;
  }

  getParams(){
    this.filteredProducts = [];
    this.subscription = this.route.queryParamMap.subscribe(params =>{
      this.category = params.get('category');
      
      this.filteredProducts = (this.category) 
      ? this.productList.filter(product => product.category == this.category) 
      : this.productList;
    });    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
