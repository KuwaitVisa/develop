import { Component, OnInit } from '@angular/core';
import { FormGroup,NgForm,FormControl } from "@angular/forms";

import { ActivatedRoute ,Router} from '@angular/router';

import { CustomerService } from '../../shared/customer.service';
import { IAgent } from '../../shared/IAgent';

@Component({
  selector: 'app-agentedit',
  templateUrl: './agentedit.component.html',
  styleUrls: ['./agentedit.component.css']
})
export class AgenteditComponent implements OnInit {


  agentForm: FormGroup;
  agent:IAgent[];
  constructor(private customerService: CustomerService,private route: ActivatedRoute,private router: Router) {
    

    this.createForm();
  }

  createForm() {
    this.agentForm = new FormGroup({
      agentName: new FormControl(),
      MobileNumber: new FormControl(),
      Address: new FormControl(),
      normalRate: new FormControl(),
      TatkalRate: new FormControl(),
    });
    }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const agentId = +params.get('id');
      console.log('Inside init '+agentId);
      if (agentId) {

        console.log('before call init '+agentId);
        this.getEmployee(agentId);
      }
    });
  }

  getEmployee(_id: number) {
    this.customerService.getAgentByID(_id)
    .subscribe(
      res => {
        this.agent = res['agent'];
        console.log("Agent Details in edit",this.agent)
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onSubmit(form: NgForm) {
    this.route.params.subscribe(params => {
      this.customerService.updateAgent(this.agent,params['id']);
      this.router.navigate(['/agentList']);
   });
  }



}
