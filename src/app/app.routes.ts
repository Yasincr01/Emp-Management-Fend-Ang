import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {
        path: "" , component:LandingComponent
    },
    {
        path: "employee", component: EmployeeComponent,

    }
    
];
