import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 
  categories = [
    {catName: 'bread', catValue: 'Bread'},
    {catName: 'dairy', catValue: 'Dairy'},
    {catName: 'fruits', catValue: 'Fruits'},
    {catName: 'seasonings', catValue: 'Seasonings and Spice'},
    {catName: 'vegitables', catValue: 'Vegitables'},
  ];

  constructor() { }

  ngOnInit() {
  }

  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });

}
