import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginComponent } from './components/login/login.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
  },
  {
    path: 'create-employee',
    component: EmployeeFormComponent,
  },
  {
    path: 'employee/:id',
    component: EmployeeFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'google-login',
    component: GoogleLoginComponent,
  },
];
