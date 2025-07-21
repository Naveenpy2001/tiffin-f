import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from '../sharingdata/services/subscription.service';
@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule]
})
export class DeliveryPartnerComponent implements OnInit {
  data: any[] = [];
  showForm = false;
  partnerForm:FormGroup;
  planid:any;
 datas: any[] = [];
  filteredPartners: any[] = [];
  searchQuery = '';
  orders:any[]=[];
  constructor(private fb:FormBuilder,private http:HttpClient,private route:Router,private subs:SubscriptionService) {
    this.partnerForm = this.fb.group({
      name: [''],
      phoneNumber: [''],
      vehicleDetails: [''],
      status: ['AVAILABLE'],
      currentLatitude: [null],
      currentLongitude: [null],
    });
   
  }

  ngOnInit(): void {
    this.getAllPartners();
  }
    gotoplans(){
      this.route.navigate(['/subplan'])
    }
  getAllPartners() {
    this.http.get<any[]>('http://localhost:8970/delivery-partners/getall').subscribe({
      next: (res) => {
        console.log(res)
        this.data = res;
         this.filteredPartners = res
      },
      error: (err) => {
        console.error('Error fetching delivery partners:', err);
      }
    });
  }
    
  
  
  postdeliverypartners(){
    const payload=this.partnerForm.value
 this.http.post('http://localhost:8970/delivery-partners/', payload).subscribe({
      next: (res) => {
        alert('Partner added successfully!');
        this.partnerForm.reset({ status: 'AVAILABLE' });
        this.showForm = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error adding partner.');
      }
    });
}

Back(){
  this.showForm=!this.showForm
}


  filterPartners() {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredPartners = this.data.filter(partner =>
      partner.name.toLowerCase().includes(query) ||
      partner.vehicleDetails.toLowerCase().includes(query)
    );
  }

 getactiveplan(){
  this.subs.getActivePlans().subscribe({
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
  this.subs.deactivatesubscription(this.planid)
    
 
 }


}