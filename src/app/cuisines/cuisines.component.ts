import { Component, OnInit } from '@angular/core';
import { CuisinesService } from '../sharingdata/services/cusines.service';
import { CuisineFilterComponent } from './cuisinesfilter/cuisinesfilter.component';
import { CommonModule } from '@angular/common';
 import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cuisine',
  standalone: true,
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.css'],
  imports: [CuisineFilterComponent, CommonModule]
})
export class CuisinesComponent implements OnInit {
  cuisines: any[] = [];             // Array to hold all cuisines
  filteredCuisines: any[] = [];     // Array for filtered cuisines based on user selection
  filterType: string = '';          // Filter by type (e.g., vegetarian, non-vegetarian)
  dietary: string[] = [];           // Array for dietary preferences (e.g., gluten-free, halal)
  selectedState: string = '';       // Store the selected state
 
  constructor(private cuisineServic: CuisinesService,private http:HttpClient) {}
 
  ngOnInit(): void {
    // Fetching the cuisines when the component initializes
    this.cuisineServic.getCuisines().subscribe(data => {
      this.cuisines = data;
      this.filteredCuisines = data;  // Initially no filter
    });
  }
 
  // Handle cuisine type change
  onFilterChange(type: string): void {
    this.filterType = type;
    this.filterCuisine();
  }
 
  // Handle dietary preference change
 onDietaryChange(dietaryTypes: string[]): void {
  this.dietary = dietaryTypes;
  this.filterCuisine();
}
 
  // Handle state change
  onStateChange(state: string): void {
    this.selectedState = state;
    this.filterCuisine();
  }
 
  // Filtering cuisines based on type, dietary, and state
  private filterCuisine(): void {
  this.filteredCuisines = this.cuisines
    .filter(cuisine => {
      const stateMatch = this.selectedState === '' || cuisine.region.toLowerCase() === this.selectedState.toLowerCase();
 
      const filteredDishes = cuisine.dishes.filter((dish: any) => {
        const typeMatch = this.filterType === '' || dish.type.toLowerCase() === this.filterType.toLowerCase();
        const dietaryMatch = this.dietary.length === 0 || this.dietary.every(d => dish.dietary.map((i: string) => i.toLowerCase()).includes(d.toLowerCase()));
        return typeMatch && dietaryMatch;
      });
 
      return stateMatch && filteredDishes.length > 0;
    })
    .map(cuisine => ({
      ...cuisine,
      dishes: cuisine.dishes
        .filter((dish: any) => {
          const typeMatch = this.filterType === '' || dish.type.toLowerCase() === this.filterType.toLowerCase();
          const dietaryMatch = this.dietary.length === 0 || this.dietary.every(d => dish.dietary.map((i: string) => i.toLowerCase()).includes(d.toLowerCase()));
          return typeMatch && dietaryMatch;
        })
        .sort((a: any, b: any) => a.name.localeCompare(b.name)) // optional sorting
    }));
}

delivery(){
    this.http.get<any[]>('http://localhost:8920/api/cuisines/getall').subscribe({
      next: (res:any) => {
        console.log(res)
       
        
      },
      error: (err:any) => {
        console.error('Error fetching data:', err);
      }
    });
  }
}