import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin));    
  }
}
