import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {

  productList: Product[];  

  constructor(private productService: ProductService) {
    this.productList =  this.getProductList();
  }

  getProductList(){    
    this.productList = [];
    this.productService.getAllProducts().snapshotChanges().subscribe(products =>{        
      products.forEach(product =>{
        let jProduct = product.payload.toJSON();
        jProduct['$key'] = product.key;
        this.productList.push(jProduct as Product);
      });
    });
    
    return this.productList;     
  }

}
