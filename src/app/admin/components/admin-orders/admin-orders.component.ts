import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { FinalOrder } from 'shared/models/finalorder';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  ordersList;
  subscription: Subscription;
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.ordersList = [];
    this.subscription = this.orderService.getOrderList().snapshotChanges().subscribe(orders =>{ 
      orders.forEach(order =>{
        this.ordersList.push(order.payload.toJSON() as Order);
      });            
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
