import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, identity } from 'rxjs';
import { User } from '../_model/user';
import { PaginatedResult } from '../_model/Pagination';
import { map } from 'rxjs/operators';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})

export class UserService {
baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getUsers(page?, itesmPerPages?): Observable<PaginatedResult<User[]>>{
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if(page != null && itesmPerPages != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itesmPerPages);
    }
    return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;

        if(response.headers.get('Pagination') != null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
    // , httpOptions
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'users/' + id);
    // , httpOptions
  }

  updateUser(id: number, user: User){
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  SetMainPhoto(userId: number, id: number){
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/SetMain', {});
  }

  deletePhoto(userId: number, id: number){
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
