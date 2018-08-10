import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { }

  createProduct(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(){
    return this.db.list('/products');  
  }

  getCategories(){    
    return this.db.list('/categories');
  }

  getProduct($key){      
    return this.db.object('/products/' + $key);        
  }

}
