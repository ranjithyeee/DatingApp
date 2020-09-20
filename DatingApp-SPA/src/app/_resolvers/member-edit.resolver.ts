
import {Injectable} from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_model/user';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor(private userService: UserService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService){}

    resolve(route:ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/members']);
                return of(null);
            } )
        );
    }
}
