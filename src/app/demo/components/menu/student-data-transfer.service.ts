import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentDataTransferService {

 
  private studentList: any[] = [];

  addEmployee(student: any) {
    this.studentList.push(student);
  }
  getEmployeeList() {
    return this.studentList;
  }
}
