import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {}
  constructor(private authserver: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authserver.login(this.model).subscribe(next => {
      console.log('Logged in succesfull.');
    }, error => {
      console.log('Problem while logging in.');
    })
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log('Logged Out');
  }
}
