import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup,NgForm,FormBuilder,Validators } from '@angular/forms';
import { ICustomers } from '../../shared/ICustomers';
import { CustomerService } from '../../shared/customer.service';
import {MatPaginator,MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerDetails:ICustomers[];
  serverErrorMessages: string;
  displayedColumns: string[] = ['fullName', 'passportnumber', 'receiveddate','submissiondate','deliverydate','priority','agentname'];
  dataSource = new MatTableDataSource<ICustomers>(this.customerDetails);
 
  p: number = 1;
  constructor(private customerService: CustomerService,private fb: FormBuilder) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {

    this.customerForm = this.fb.group({
      cname: ['', Validators.required ],
      enterYour: ['', Validators.required ]
   });
  }

  search(form: NgForm): void {
    
    console.log("fullName"+form.value.cname);
    console.log("enterYour"+form.value.enterYour);
    
    this.customerService.search(form.value.cname , form.value.enterYour).subscribe(
      res => {
        this.customerDetails = (res['customer']);
        
        console.log("Customer Details",this.customerDetails);
      },
      err => { 
        console.log(err);
         this.serverErrorMessages = "customer record not found";
        
      }
    );

    this.dataSource.paginator = this.paginator;


  }


}
