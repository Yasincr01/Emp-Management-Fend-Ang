import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  allEmployee: any = []
  addEmployeeForm: FormGroup
  editEmployeeForm:FormGroup
  selectedEmployeeId: number | null = null;


  constructor(private api: ApiService, private fb: FormBuilder) {
    this.addEmployeeForm= this.fb.group({
      username:[''],
      email:[''],
      age:[null],
      status:['']
    })
    this.editEmployeeForm= this.fb.group({
      username:[''],
      email:[''],
      age:[null],
      status:['']
    })
  }

  ngOnInit() {
    this.getAllEmployee()
  }

  // get Employee
  getAllEmployee() {
    this.api.getAllEmployeeAPI().subscribe((res: any) => {
      // console.log(res);
      this.allEmployee = res

    })
  }


  // add Employee
  addEmployee()
  {
    if(this.addEmployeeForm.valid)
    {
        const username=this.addEmployeeForm.value.username
        const email=this.addEmployeeForm.value.email
        const age=this.addEmployeeForm.value.age
        const status=this.addEmployeeForm.value.status

        this.api.addEmployeeAPI({username,email,age,status}).subscribe((res:any)=>{
          alert("Employee Added Successfully")
          this.ngOnInit()
          this.addEmployeeForm.reset()
        })
    }
    else
    {
      alert("Invalid Form")
    }
  }
  // edit employee
  openEditModal(employee:any)
  {
    this.selectedEmployeeId=employee.id
    this.editEmployeeForm.patchValue({
      username:employee.username,
      email:employee.email,
      age:employee.age,
      status:employee.status
    })
  }

  editEmployee()
  {
    if(this.editEmployeeForm.valid)
    {
      const updatedEmployee={...this.editEmployeeForm.value,id:this.selectedEmployeeId}

      this.api.editEmployeeAPI(updatedEmployee).subscribe((res:any)=>{
        alert("Employee Updated Successfully")
        this.ngOnInit()
      })
    }
    else
    {
      alert("Invalid Form")
    }
  }

  // delete Employee
  deleteEmployee(id: any) {
    this.api.deleteEmployeeAPI(id).subscribe((res: any) => {
      alert("Employee Deleted Successfully")
      this.getAllEmployee()
    })
  }
  
  // filter
  filterItems(status:any) {
    console.log(`status: ${status}`);
    
    if (status == 'All') {
      this.getAllEmployee(); 
    } else {
      this.api.filterAPI(status).subscribe((response:any) => {
        this.allEmployee = response;
        console.log(this.allEmployee);
      });
    }
  }

}
