import { Component, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy {

  @Input('category') category;
  subscription: Subscription; 
  categoryList: Category[];

  constructor(private productService: ProductService) {
    this.categoryList = this.getCategories();  
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
