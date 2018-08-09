import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { Category } from '../../models/category';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
      
  categories = [
    {catName: 'bread', catValue: 'Bread'},
    {catName: 'dairy', catValue: 'Dairy'},
    {catName: 'fruits', catValue: 'Fruits'},
    {catName: 'seasonings', catValue: 'Seasonings and Spice'},
    {catName: 'vegitables', catValue: 'Vegitables'},
  ];

  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)    
  });

  categoryList: Category[];

  constructor(private productService: ProductService, private router: Router) { 
    this.categoryList = this.getCategories();    
  }

  saveProduct(product){  
    this.productService.createProduct(product);
    this.router.navigate(['/admin/products']);
  }

  getCategories(){
    return this.productService.getCategories();
  }

}
