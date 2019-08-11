import { Component, OnInit } from '@angular/core';
import { FormGroup,NgForm,FormControl } from "@angular/forms";

import { ActivatedRoute ,Router} from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { CustomerService } from '../../shared/customer.service';
import { Customer } from '../../shared/customer.model';
import { IAgent } from '../../shared/IAgent';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  agentDetails:IAgent[];
  datePickerConfig: Partial<BsDatepickerConfig>;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  date = new FormControl(new Date());
  customerForm: FormGroup;

  serializedDate = new FormControl((new Date()).toISOString());
  constructor(private customerService: CustomerService,private route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY' });
   }
  customer;
 
  ngOnInit() {

    this.customerForm = new FormGroup({
      fullName: new FormControl(),
      passportnumber: new FormControl(),
      visaexpdate: new FormControl(),
      medicalexpdate: new FormControl(),
      receiveddate: new FormControl(),
      submissiondate: new FormControl(),
      deliverydate: new FormControl(),
      priority: new FormControl(),
      agentname: new FormControl(),
      status: new FormControl(),
      comments: new FormControl(),
      mobile: new FormControl(),
    });
  
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

  
  getEmployee(_id: number) {
    this.customerService.getEmployee(_id)
      .subscribe(
        (customer: Customer) =>{
          this.customer =customer;
          console.log('Create :'+customer);
         this.editEmployee(customer);
        },
        (err: any) => console.log(err)
      );
  }

  editEmployee(employee: Customer) {
      this.customerForm.patchValue({
      fullName: this.customerService.selectedCustomer.fullName,
      passportnumber: this.customerService.selectedCustomer.passportnumber,
      visaexpdate: this.customerService.selectedCustomer.visaexpdate,
      medicalexpdate: this.customerService.selectedCustomer.medicalexpdate,
      receiveddate: this.customerService.selectedCustomer.receiveddate,
      submissiondate: this.customerService.selectedCustomer.submissiondate,
      deliverydate: this.customerService.selectedCustomer.deliverydate,
      priority: this.customerService.selectedCustomer.priority,
      agentname: this.customerService.selectedCustomer.agentname,
      status: this.customerService.selectedCustomer.status,
      comments: this.customerService.selectedCustomer.comments,      
    });
  }

  onSubmit(form: NgForm) {
    
    for (let agent of this.agentDetails) {
      
      if(agent.agentName === form.value.agentname){

        form.value.mobile = agent.MobileNumber;
        console.log("form mobile Number"+form.value.mobile);
      
      }
  }
    this.customerService.postCustomer(form.value).subscribe(
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
    this.customerService.selectedCustomer = {
     _id:null,
      fullName: '',
      passportnumber: '',
      visaexpdate: '',
      medicalexpdate: '',
      receiveddate: '',
      submissiondate: '',
      deliverydate: '',
      priority: '',
      agentname: '',
      status: '',
      comments:'',
      mobile:null,
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }


}
