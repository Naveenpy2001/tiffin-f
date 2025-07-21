import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-membership-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership-plan.component.html',
  styleUrl: './membership-plan.component.css'
})
export class MembershipPlanComponent {  isFormVisible: boolean = false;
openform(){
  window.open()
}
}
