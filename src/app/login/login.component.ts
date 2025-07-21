

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../sharingdata/services/login.service';
import { UserLogin } from '../sharingdata/interfaces/Userlogin';
import { AsyncValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { map,of } from 'rxjs';
import { catchError,Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnurl = '';
  errorMessage ='';
 showErrorPopup = false;
 isLoading = false;
 showpopup = false;
 data:any;
  constructor(
    private fb: FormBuilder,
    private registerservice: RegistrationService,
    private router: Router,
    private activated: ActivatedRoute,

  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email],],
      password: ['', Validators.required]
    });

    this.returnurl = this.activated.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.errorMessage = '';
    this.showErrorPopup = false;
    if (this.loginForm.valid) {
      const lv = this.loginForm.value;
      const logindata: UserLogin = {
        email: lv.Email,
        password: lv.password
      };
       this.isLoading = true;
      this.registerservice.login(logindata).subscribe({
       next: (res) => {
        this.data=res
        console.log(res);
        this.isLoading = false;
        this.showpopup = true;
        setTimeout(() => {
          this.showpopup = false; 
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
      
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Login failed Please Try Again';
        this.showErrorPopup = true;
        console.log(err);
      }
        
      });
    }
    
      this.loginForm.reset();
  }
}
  