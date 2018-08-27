import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [      
    ShoppingModule,
    SharedModule,
    AdminModule, 
    CoreModule,                   
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,       
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},      
      {path: 'login', component: LoginComponent},          
    ])
  ],
  providers: [
    AdminAuthGuard,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
