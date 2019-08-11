import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import { ICustomers } from '../../shared/ICustomers';
import { CustomerService } from '../../shared/customer.service';

import { Router } from "@angular/router";

@Component({
  selector: 'app-cs-details',
  templateUrl: './cs-details.component.html',
  styleUrls: ['./cs-details.component.css']
})
export class CsDetailsComponent implements OnInit {
  customerDetails:ICustomers[];
  displayedColumns: string[] = ['fullName', 'agentname', 'priority', 'receiveddate'];
  //dataSource = new MatTableDataSource<ICustomers>(this.customerDetails);
  dataSource : MatTableDataSource<PeriodicElement>;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private customerService: CustomerService, private _router: Router) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    
    this.customerService.getCustomerList().subscribe(
      res => {
        //this.dataSource = res['customer'];
        this.dataSource = new MatTableDataSource<PeriodicElement>(res['customer']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Customer Details",this.dataSource);
        
      },
      err => { 
        console.log(err);
        
      }
    );
    
  }

}
export interface PeriodicElement {
  fullName: string;
  agentname: string;
  priority: string;
  receiveddate: string;
}

