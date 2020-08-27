import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService,
    private alertify: AlertifyService, private router: Router
    ){}

  canActivate(): boolean {
    if(this.authservice.loggedIn()){
      return true;
    }
    this.alertify.error('You shall not paa!!');
    this.router.navigate(['home']);
    return false;
  }
}
