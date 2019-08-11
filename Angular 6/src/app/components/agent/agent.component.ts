import { Component, OnInit } from '@angular/core';
import { FormGroup,NgForm,FormControl } from "@angular/forms";

import { ActivatedRoute ,Router} from '@angular/router';

import { CustomerService } from '../../shared/customer.service';
import { Agent } from '../../shared/agent.model';
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  
  agentForm: FormGroup;

  constructor(private customerService: CustomerService,private route: ActivatedRoute) { }
  agent:Agent[];
  

  ngOnInit() {
    this.agentForm = new FormGroup({
      agentName: new FormControl(),
      MobileNumber: new FormControl(),
      Address: new FormControl(),
      normalRate: new FormControl(),
      TatkalRate: new FormControl(),
      
    });
  

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.customerService.postAgent(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }
  
  resetForm(form: NgForm) {
    this.customerService.selectedAgent = {
     _id:null,
     agentName: '',
     MobileNumber: '',
     Address: '',
     normalRate: '',
     TatkalRate: '',
     
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
