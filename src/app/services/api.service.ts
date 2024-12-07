import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "https://emp-management-server-angular.onrender.com"

  constructor(private http:HttpClient) { }
   
  // get Employee
  getAllEmployeeAPI(){
   return this.http.get(`${this.server_url}/allEmployeeDetails`)
  }
   
  // addEmployee
  addEmployeeAPI(empDetails:any){
    return this.http.post(`${this.server_url}/allEmployeeDetails`, empDetails)
  }

  // edit
  editEmployeeAPI(empDetails:any){
    return this.http.put(`${this.server_url}/allEmployeeDetails/${empDetails.id}`,empDetails)
  }
    
  
  // deleteEmployeeAPI
  deleteEmployeeAPI(id:any){ 
    return this.http.delete(`${this.server_url}/allEmployeeDetails/${id}`)
  }

 
  filterAPI(status:any) {
    return this.http.get(`${this.server_url}/allEmployeeDetails?status=${status}`);
  }
}
