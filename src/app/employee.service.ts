import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from './employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employee: EmployeeModel[];
  dataSource: any;
  // generates UI 
  departmentSelected: boolean = false;
  displayedColumns: string[] = ['Name', 'Email', 'Age', 'Position', 'Delete'];
  reqUrl: string = 'http://localhost:3000/employee/';
  departmentID: string;
  employeeName: string;
  employeeEmail: string;
  employeeAge: number;
  employeePosition: string;
  employeeID: string;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

constructor(private http: HttpClient) { }

  getEmployees(): Observable<EmployeeModel>{
    console.log('test');
    // departmentID = this.departmentID;
    return this.http.get<EmployeeModel>(`http://localhost:3000/department/${this.departmentID}/employee`);
  }

  deleteEmployee(employeeID: string): Observable<string> {
    return this.http.delete<string>(`${this.reqUrl}${employeeID}`)
  }

  addEmployee(): Observable<EmployeeModel>{
    let newEmployee = new Object({
      departmentID: this.departmentID,
      employeeName: this.employeeName,
      employeeEmail: this.employeeEmail,
      employeeAge: this.employeeAge,
      employeePosition: this.employeePosition,
    });
    return this.http.post<EmployeeModel>(`${this.reqUrl}`, JSON.stringify(newEmployee), this.httpOptions);
  }

}
