import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import { NgChartsConfiguration } from 'ng2-charts';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentcheckoutpage',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './paymentcheckoutpage.component.html',
  styleUrl: './paymentcheckoutpage.component.css'
})
export class PaymentcheckoutpageComponent {
constructor(private router:Router){
 
}
 
  
paymentMethod = 'wallet';

  orderSummary = {
    items: [
      { name: 'South Indian Tiffin', price: 120 },
      { name: 'Masala Chai', price: 20 }
    ],
    delivery: 0,
    tax: 10,
    walletBalance: 300
  };

  get total(): number {
    const subtotal = this.orderSummary.items.reduce((sum, i) => sum + i.price, 0);
    return subtotal + this.orderSummary.tax + this.orderSummary.delivery;
  }

  confirmPayment() {
   this.router.navigate(['/payment']);
  }

@ViewChild('indiaPieChart') chartRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Tiffino (100%)', 'Zomato (60%)', 'Swiggy (55%)'],
          datasets: [{
            label: 'India Coverage (%)',
            data: [100, 60, 55],
            backgroundColor: ['#ff345', '	#FF0000', '#FFA500'],
            borderColor: ['#fff', '#fff', '#fff'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              enabled: true
            }
          }
        }
      });
    }
  }





}
