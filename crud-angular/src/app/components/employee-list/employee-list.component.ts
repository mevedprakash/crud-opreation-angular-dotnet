import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  router = inject(Router);
  employeeList: IEmployee[] = [];
  httpService = inject(HttpService);
  toaster = inject(ToastrService);
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'age',
    'phone',
    'salary',
    'action',
  ];
  ngOnInit() {
    this.getEmployeeFromServer();
  }
  getEmployeeFromServer() {
    this.httpService.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
      console.log(this.employeeList);
    });
  }
  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/employee/' + id);
  }
  delete(id: number) {
    this.httpService.deleteEmployee(id).subscribe(() => {
      console.log('deleted');
      // this.employeeList=this.employeeList.filter(x=>x.id!=id);
      this.getEmployeeFromServer();
      this.toaster.success('Record deleted sucessfully');
    });
  }
}
