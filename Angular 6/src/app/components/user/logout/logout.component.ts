import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
