import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { map,of } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrationService } from '../sharingdata/services/login.service';
import { UserRegister } from '../sharingdata/interfaces/Userregister';
import { RouterLink } from '@angular/router';
import { AsyncValidatorFn,AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  step = 1;
  isLoading = false;
  imageError = false;
  selectedFile: File | null = null;
  showpopup = false;
  showErrorPopup = false;
  errorMessage = '';
  termsAccepted = false;
  isSubmit = false;
  userData: any = '';

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      roles: ['', Validators.required],
      profileImageUrl: ['', Validators.required],
      isActive: [true, Validators.required],
      dietaryPreferences: ['', Validators.required],
      allergenPreferences: ['', Validators.required],
      /*dateJoined: ['', Validators.required],*/
      /*lastLogin: ['', Validators.required],*/
      addresses: this.fb.array([this.createAddressGroup()])
    });
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      latitude: [0, [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: [0, [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      isDefault: [false],
      addressType: ['Home', Validators.required]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  get addresses(): FormArray {
    return this.signupForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number) {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  nextStep() {
    if (this.validateCurrentStep() && this.step < 4) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  validateCurrentStep(): boolean {
    const controlsToCheck: Record<number, string[]> = {
      1: ['fullName', 'password', 'email', 'phoneNumber', 'firstName', 'lastName', 'gender'],
      2: ['roles', 'profileImageUrl', 'isActive', 'dietaryPreferences', 'allergenPreferences',],
      3: []
    };

    const controls = controlsToCheck[this.step] || [];
    controls.forEach(name => this.signupForm.get(name)?.markAsTouched());

    const isValid = controls.every(name => this.signupForm.get(name)?.valid);
    if (this.step === 3 && this.addresses.invalid) {
      this.addresses.markAllAsTouched();
      return false;
    }

    return this.step === 3 ? this.addresses.valid : isValid;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageError = false;
      this.signupForm.get('profileImageUrl')?.setValue(file.name);
    }
  }

  onSubmit() {
    this.isSubmit = true;
    this.errorMessage = '';
    this.showErrorPopup = false;

    if (this.signupForm.invalid || !this.termsAccepted || !this.selectedFile) {
      if (!this.selectedFile) this.imageError = true;
      this.validateCurrentStep();
      return;
    }

    const formValue = this.signupForm.value;

    const userData: UserRegister = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      fullName: formValue.fullName,
      gender: formValue.gender,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      password: formValue.password,
      role: formValue.roles,
      isActive: formValue.isActive,
      dietaryPreferences: formValue.dietaryPreferences,
      allergenPreferences: formValue.allergenPreferences,
      profileImageUrl: formValue.profileImageUrl,
      /*dateJoined: formValue.dateJoined,
      lastLogin: formValue.lastLogin,*/
      addresses: formValue.addresses
    };

    this.isLoading = true;

    this.registrationService.register(userData).subscribe({
      next: (res) => {
        this.userData = res;
        this.isLoading = false;
        this.showpopup = true;
        setTimeout(() => {
          this.showpopup = false;
          this.resetForm();
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.userData = err;
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Registration failed';
        this.showErrorPopup = true;
        console.log(err);
      }
    });
  }

  resetForm() {
    this.signupForm.reset();
    this.addresses.clear();
    this.addresses.push(this.createAddressGroup());
    this.step = 1;
    this.isSubmit = false;
    this.selectedFile = null;
    this.termsAccepted = false;
  }
}