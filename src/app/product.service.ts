import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from './models/product';
import { Category } from './models/category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Product[];
  categoryList: Category[];
  
  constructor(private db: AngularFireDatabase) { }

  createProduct(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(){
    this.productList = [];
    this.db.list('/products').snapshotChanges().subscribe(products =>{        
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
    this.db.list('/categories').snapshotChanges().subscribe(categories =>{
      categories.forEach(category =>{              
        let jCategory = category.payload.toJSON();          
        jCategory['key'] = category.payload.key;                        
        this.categoryList.push(jCategory as Category);
      });
    });
    return this.categoryList;
  }

}
