import { Component, OnInit } from '@angular/core';
import { User } from '../../_model/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute} from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_model/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];
pagination: Pagination;
  constructor(private userService: UserService,
    private alertyfy: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  pageChanged(event: any): void{
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage)
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertyfy.error(error);
    });
  }
}
