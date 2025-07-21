import { Component } from '@angular/core';
import { SubscriptionService } from '../../sharingdata/services/subscription.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionsComponent {
  planForm!: FormGroup;
planid:any;
  constructor(private fb: FormBuilder, private http: HttpClient,private subsc:SubscriptionService) {}

  ngOnInit(): void {
    this.planForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      mealType: ['', Validators.required],
      mealFrequency: ['', Validators.required],
      durationInWeeks: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      isActive: [true]
    });
  }

  onSubmit(): void {
    if (this.planForm.valid) {
      const payload = this.planForm.value;
      console.log('Payload:', payload);

    this.subsc.createsubscriptions(payload).subscribe({
        next: (res) => alert('Subscription plan created successfully!'),
        error: (err) => console.error('Error:', err)
      });
    }
  }
  
 getactiveplan(){
  this.subsc.getActivePlans().subscribe({
    next:(data)=>{console.log(data);
      const activePlan = data.find((plan: any) => plan.isActive);  // Find the active plan
      if (activePlan) {
        this.planid = activePlan.id;  // Store its ID
        console.log('Active Plan ID:', this.planid);
      } else {
        console.warn('No active plan found.');
      }
    },
    error:(err)=>{console.log(err)}
  })
 } 
 deactivate(){
  this.subsc.deactivatesubscription(this.planid)
 }
}
