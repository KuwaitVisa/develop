import { Injectable } from '@angular/core';


import { environment } from '../../environments/environment';
import { Customer } from './customer.model';
import { Agent } from './agent.model';
import { ICustomers } from './ICustomers';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  selectedCustomer: Customer = {
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

  selectedAgent: Agent = {
    _id:null,
    agentName: '',
    MobileNumber: '', 
    Address: '',
    normalRate:'',
    TatkalRate:''
  };
 
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  postCustomer(customer: Customer){
    console.log("customer service:"+customer);
    return this.http.post(environment.apiBaseUrl+'/customer',customer,this.noAuthHeader);
  }
  postAgent(agent: Agent){
    const obj = {
      agentName: agent.agentName,
      MobileNumber: agent.MobileNumber,
      normalRate: agent.normalRate,
      TatkalRate: agent.TatkalRate,
      Address: agent.Address
    };
    return this.http.post(environment.apiBaseUrl+'/agent', obj);
       
  }
    
  search(fullName , enterYour) {

    
    console.log("enterYour obj"+enterYour);
    if (enterYour.trim() === "name".trim()) {
      console.log("inside if");
      return this.http.get(`${environment.apiBaseUrl+'/searchByName'}/${fullName}`);
    }
    else if(enterYour.trim() === "passportNumber".trim()){
      console.log("inside else if");
      return this.http.get(`${environment.apiBaseUrl+'/searchByPassport'}/${fullName}`);
    }
    else if(enterYour.trim() === "agentname".trim()){
      console.log("inside else if");
      return this.http.get(`${environment.apiBaseUrl+'/searchByAgentName'}/${fullName}`);
    }
    
  }
  
  getCustomerList() {
    return this.http.get(environment.apiBaseUrl + '/customerList');
  }

  getAgentList() {
    return this.http.get(environment.apiBaseUrl + '/agentList');
  }

  getCustomers(): Observable<ICustomers[]> {
    return this.http.get<ICustomers[]>(environment.apiBaseUrl + '/customerList')
        .pipe(catchError(this.handleError));
}



getCustomersByNearDays(): Observable<Customer> {
  
  return this.http.get<Customer>(environment.apiBaseUrl + '/customerBySubmissionDateNull')
      .pipe(catchError(this.handleError));
}

getEmployee(_id: number): Observable<Customer> {
  console.log('Service:::::'+_id);
  return this.http.get<Customer>(`${environment.apiBaseUrl+'/customerById'}/${_id}`)
      .pipe(catchError(this.handleError));
}

getAgentByID(_id: number): Observable<Agent> {
  console.log('Service:::::'+_id);
  return this.http.get<Agent>(`${environment.apiBaseUrl+'/agentById'}/${_id}`)
      .pipe(catchError(this.handleError));
}

updateEmployee(customer, id) {
  console.log("customer service:"+customer);
  const obj = {
    fullName: customer.fullName,
    passportnumber: customer.passportnumber,
    submissiondate: customer.submissiondate,
    deliverydate: customer.deliverydate,
    agentname: customer.agentname,
    mobile:customer.mobile,

  };
  this
    .http
    .post(`${environment.apiBaseUrl+'/update'}/${id}`, obj)
    .subscribe(res => console.log('Done'));
}

updateAgent(agent, id) {

  const obj = {
    agentName: agent.agentName,
    MobileNumber: agent.MobileNumber
  };
  this
    .http
    .post(`${environment.apiBaseUrl+'/agentupdate'}/${id}`, obj)
    .subscribe(res => console.log('Done'));
}

agentdelete(id) {
  return this
            .http
            .get(`${environment.apiBaseUrl+'/agentdelete'}/${id}`);
}

delete(id) {
  return this
            .http
            .get(`${environment.apiBaseUrl+'/delete'}/${id}`);
}
private handleError(errorResponse: HttpErrorResponse) {
  if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
  } else {
      console.error('Server Side Error :', errorResponse);
  }
  return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}
}
