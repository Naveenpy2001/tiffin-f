import { Component,AfterViewInit,ViewChild,ElementRef,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
 declare var paypal:any;
 
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class paymentComponent implements AfterViewInit,OnInit{
  constructor(private route:ActivatedRoute){}
  @ViewChild('paypalButtonContainer') paypalButtonContainer!:ElementRef;
  payerName:String='';
  payerEmail:string='';
  payerImage:string='';
  totalamount:number=0;
  ngOnInit(): void {
   
  }
  ngAfterViewInit(): void {
    if(typeof paypal !== 'undefined')
    {
      paypal.Buttons({
        createOrder:(data:any,actions:any)=>{
          return actions.order.create({
            purchase_units:[{
              amount:{
                value:'20.0',
               
              }
            }]
          })
        },
        onApprove:(data:any,actions:any)=>{
          return actions.order.capture().then((details:any) =>{
           this.payerName=details.payer.name.given_name;
           this.payerEmail=details.payer.email_address;
           this.payerImage=details.payer.picture;
           alert('transaction completed by'+ this.payerName);
           console.log(details);
           this.showpayerInfoBox();
          })
 
          },
          onError:(err:any)=>{
            console.log('paypal button error',err)
          }
 
      }).render(this.paypalButtonContainer.nativeElement);
    } else {
       console.log('paypal sdk not found');
    }
  }
  showpayerInfoBox(){
    const container=this.paypalButtonContainer.nativeElement
    container.innerHTML=`<div class='payer-info'>
    <img src="${this.payerImage} alt="payer profile" width="50" height="50"/>
    <p><strong>Name:</strong>${this.payerName}</p>
    <p><strong>Email:</strong>${this.payerEmail}</p>
    </div>
    <div  id="paypal-button-conatiner"></div>`
    paypal.Buttons().render('#paypal-button-container');
  }
}