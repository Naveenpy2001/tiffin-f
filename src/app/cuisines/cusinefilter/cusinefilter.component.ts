
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cuisine-filter',
  standalone: true,
  templateUrl: './cusinefilter.component.html',
  styleUrls: ['./cusinefilter.component.css'],
  imports: [FormsModule,CommonModule], // Import FormsModule for ngModel
})
export class CuisineFilterComponent {

   @Output() filterChange = new EventEmitter<string>();
  @Output() dietaryChange = new EventEmitter<string[]>();
  @Output() stateChange = new EventEmitter<string>();

  selectedMode: string = '';
  selectedstate: string = '';
  selectedDietary: string[] = [];

  regions: string[] = ['Jammu & Kashmir', 'Himachal Pradesh', 'Punjab', 'Andhra Pradesh', 'Andaman & Nicobar Islands'];
  dietaryOptions: string[] = ['gluten-free', 'halal'];

  onSelectFilter(): void {
    this.filterChange.emit(this.selectedMode);
  }

  onDietaryCheckboxChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedDietary.push(value);
    } else {
      this.selectedDietary = this.selectedDietary.filter(d => d !== value);
    }
    this.dietaryChange.emit(this.selectedDietary);
  }

  onStateChange(): void {
    this.stateChange.emit(this.selectedstate);
  }

  clearFilters(): void {
    this.selectedMode = '';
    this.selectedstate = '';
    this.selectedDietary = [];
    this.filterChange.emit('');
    this.stateChange.emit('');
    this.dietaryChange.emit([]);
  }

}