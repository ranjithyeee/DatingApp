import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  jwtHelper = new JwtHelperService();

  constructor(private authservice: AuthService){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token){
      this.authservice.decodedToken = this.jwtHelper.decodeToken(token);
      // this.authservice.currentUser = user;
    }
    if (user){
      this.authservice.currentUser = user;
      this.authservice.ChangeMemberPhoto(user.photoUrl);
    }
  }
}
