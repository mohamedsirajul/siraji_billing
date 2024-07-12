import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  username: any;
//   imageurl: string;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.username = localStorage.getItem('name');
    }
    // else this.apiservice.userLogout()
  }

  logout() {
    this.authenticationService.logout();
  }

}
