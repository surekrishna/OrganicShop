import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService, private auth: AuthService) { }

  canActivate(): Observable<boolean>{
    return this.auth.user$.pipe(switchMap(user => this.userService.get(user.uid)))
      .pipe(map(appUser => appUser.isAdmin));    
  }
}
