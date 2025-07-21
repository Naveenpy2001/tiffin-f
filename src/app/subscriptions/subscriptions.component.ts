import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscriptionService } from '../sharingdata/services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionComponent implements OnInit {
  form: FormGroup;
  plans: any[] = [];
  searchQuery: string = '';
  selectedPlanId: number | null = null;
  userId: number = 0;
  token: string = '';
   isLoading = false;
   showpopup = false;
  showErrorPopup = false;
   userData: any = '';
  errorMessage = '';
  subscriptionid:any;
  showActiveCard: boolean = false;
  activeSubscription:any=[];
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  subs = inject(SubscriptionService);

  constructor() {
    this.form = this.fb.group({
      MealType:[''],
      BillingCycle:[''],
      SpiceLevel: [''],
      SubscriptionStatus:[''],
      /*portionSize: [''],*/
      autoRenew: [false],
      dietaryRestrictions: [''],
      /*additionalRequests: [''],
      totalInstallments: [null]*/
    });
  }
  

  


  ngOnInit(): void {
    
  this.getAllplans();
 this.onSearch();
    const raw = localStorage.getItem('user');
    if (raw) {
      const parsed = JSON.parse(raw);
      this.userId = parsed.user?.id;
      this.token = parsed.token;
    }
     this.subs.getusersplan(this.userId).subscribe({
      next :(data:any[])=>{
        console.log(data);
        this.subscriptionid = data[0].id;
        this.activeSubscription=data[0];
      },
      error:(err)=>{
        console.log(err);
      }
     })
  }


  getAllplans(){
this.subs.getActivePlans().subscribe({
      next: (plans: any[]) => {
        this.plans = plans;
        console.log(plans);
      },
      error: (err) => console.error('Error fetching plans:', err)
    });
  }

  
  onSearch() {
   
      this.subs.searchPlans().subscribe({
        next: (filteredPlans) => {
          console.log(filteredPlans)
          this.plans = filteredPlans;
        },
        error: (err) => console.error('Error searching plans:', err)
      });
    
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.showErrorPopup = false;
    if (this.form.invalid || !this.selectedPlanId) {
      alert('Please fill all fields and select a plan');
      this.form.markAllAsTouched();
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const url = `http://localhost:8960/subscriptions/${this.userId}/subscribe/${this.selectedPlanId}`;
    this.http.post(url, this.form.value, { headers }).subscribe({
      next: (res) => {
        console.log(res);
       // this.router.navigate(['/payment'])
        this.userData=res;
      
        this.isLoading = false;
        this.showpopup = true;
        alert('Subscription created successfully!');
        
        setTimeout(() => {
          this.showpopup = false;
          this.form.reset();
          this.router.navigate(['/login']);
        }, 3000);
        this.selectedPlanId = null;
      },
      error: (err) => {
        console.error('Subscription failed:', err);
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'subscription Failed ';
        this.showErrorPopup = true;
        alert('Failed to create subscription.');
      }
    });
  }

 pausesubscription(){
   this.subs.pause(this.subscriptionid,this.token).subscribe({
    next:()=>{
      alert('subscription paused sucessfully')
    },
    error:()=>{
      alert('subscription failed');
    }
   })
 }
 resumesubscription(){
   this.subs.resume(this.subscriptionid).subscribe({
    next:()=>{
      alert('subscription resume sucessfully')
    },
    error:()=>{
      alert('subscription failed');
    }
   })
 }
cancelsubscription(){
   this.subs.cancel(this.subscriptionid,this.token).subscribe({
    next:()=>{
      alert('subscription cancelled sucessfully')
    },
    error:()=>{
      alert('subscription failed');
    }
   })
 }
}