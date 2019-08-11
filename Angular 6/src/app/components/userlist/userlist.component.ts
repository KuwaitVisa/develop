import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { IUser } from '../../shared/IUser';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  userDetails:IUser[];
  p: number = 1;
  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit() {

    this.userService.getUserList().subscribe(
      res => {
        this.userDetails = res['user'];
        
        console.log("User Details",this.userDetails)
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  delete(id) {
    this.userService.userdelete(id).subscribe(res => {
      console.log('Deleted');
    });
  }

}
