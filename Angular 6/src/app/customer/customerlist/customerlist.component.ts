import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ICustomers } from '../../shared/ICustomers';
import { CustomerService } from '../../shared/customer.service';

import { Router } from "@angular/router";

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customerDetails:ICustomers[];
 
  displayedColumns: string[] = ['fullName', 'passportnumber', 'receiveddate','submissiondate','deliverydate','priority','agentname'];
  dataSource = new MatTableDataSource<ICustomers>(this.customerDetails);
 
  p: number = 1;

  constructor(private customerService: CustomerService, private _router: Router) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    
    this.customerService.getCustomerList().subscribe(
      res => {
        this.customerDetails = (res['customer']);

        console.log("Customer Details",this.dataSource);
        
      },
      err => { 
        console.log(err);
        
      }
    );
    this.dataSource.paginator = this.paginator;
  }
 
  editButtonClick(employeeId: number) {
    console.log('ID:'+employeeId);
    this._router.navigate(['/edit', employeeId]);
  }

  delete(id) {
    this.customerService.delete(id).subscribe(res => {
      console.log('Deleted');
    });
  }

}
