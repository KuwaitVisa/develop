import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,NgForm,FormControl } from "@angular/forms";
import {MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { IAgent } from '../../shared/IAgent';
@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.css']
})
export class AgentlistComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  agentDetails:IAgent[];
  p: number = 1;
  constructor(private customerService: CustomerService, private _router: Router) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    
    this.customerService.getAgentList().subscribe(
      res => {
        this.agentDetails = res['agent'];
        
        console.log("Agent Details",this.agentDetails)
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  editButtonClick(employeeId: number) {
    console.log('ID:'+employeeId);
    this._router.navigate(['/agentedit', employeeId]);
  }

  delete(id) {
    this.customerService.agentdelete(id).subscribe(res => {
      console.log('Deleted');
    });
  }

}
