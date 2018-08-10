import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
      
  categoryList: Category[];
  product: Product;
  $key: string;

  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)    
  });  

  constructor(private productService: ProductService, 
              private router: Router,
              private route: ActivatedRoute) { 
    this.categoryList = this.getCategories();
    this.$key = this.route.snapshot.paramMap.get('$key'); 
    this.product = this.getProduct(this.$key);      
  }

  saveProduct(product){      
    if(null != this.$key) {      
      this.productService.updateProduct(this.$key,product);
    }else {      
      this.productService.createProduct(product);
    }

    this.router.navigate(['/admin/products']);
  }

  getCategories(){   
    this.categoryList = [];
    this.productService.getCategories().snapshotChanges().subscribe(categories =>{
      categories.forEach(category =>{              
        let jCategory = category.payload.toJSON();          
        jCategory['key'] = category.payload.key;                        
        this.categoryList.push(jCategory as Category);
      });
    });
    return this.categoryList;
  }

  getProduct($key){ 
    this.product = <Product>{};     
    this.productService.getProduct($key).snapshotChanges().subscribe(product =>{
      let jProduct = product.payload.toJSON();  
      if(null != jProduct){
        this.product.$key = product.key;
        this.product.title = jProduct['title'];
        this.product.price = jProduct['price'];
        this.product.category = jProduct['category'];
        this.product.imageUrl = jProduct['imageUrl'];
      }                 
    }); 
        
    return this.product;  
  }

}
