import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../sharingdata/services/login.service';// Adjust path if needed
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-change-password',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './forgotpasswordlogin.component.html',
  styleUrls: ['./forgotpasswordlogin.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: RegistrationService) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsValidator });
  }

  passwordsValidator(form: FormGroup) {
    const current = form.get('currentPassword')?.value;
    const newPass = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;

    const errors: any = {};
    if (current === newPass) errors.sameAsCurrent = true;
    if (newPass !== confirm) errors.confirmMismatch = true;

    return Object.keys(errors).length > 0 ? errors : null;
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) return;

    this.isLoading = true;

    const payload = {
      currentPassword: this.f['currentPassword'].value,
      newPassword: this.f['newPassword'].value
    };

    this.authService.changePassword(payload).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully.';
        this.errorMessage = '';
        this.isLoading = false;
        this.changePasswordForm.reset();
        this.submitted = false;
      },
      error: (err:any) => {
        this.errorMessage = err?.error?.message || 'Failed to change password.';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }
}
