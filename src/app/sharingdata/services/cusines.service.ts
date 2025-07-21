import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuisinesService {

  constructor() { }

  // Simulating an API call for regional cuisines with filtering properties
  getCuisines(): Observable<any[]> {
    const cuisines = [
      // Northern India
      { 
        region: 'Jammu & Kashmir', 
        dishes: [
          { name: 'Rogan Josh', type: 'non-vegetarian', dietary: ['vegan'] },
          { name: 'Yakhni', type: 'non-vegetarian', dietary: ['vegan'] },
          { name: 'Dum Aloo', type: 'vegetarian', dietary: ['gluten-free'] },
          { name: 'Modur Pulao', type: 'vegetarian', dietary: ['vegan'] },
          { name: 'Kashmiri Kahwa', type: 'vegetarian', dietary: ['vegan'] }
        ]
      },
      { 
        region: 'Himachal Pradesh', 
        dishes: [
          { name: 'Dham', type: 'vegetarian', dietary: ['gluten-free'] },
          { name: 'Sidu', type: 'vegetarian', dietary: ['gluten-free'] },
          { name: 'Chana Madra', type: 'vegetarian', dietary: ['vegan'] },
          { name: 'Babru', type: 'vegetarian', dietary: ['vegan'] },
          { name: 'Aktori', type: 'vegetarian', dietary: ['vegan'] }
        ]
      },
      { 
        region: 'Punjab', 
        dishes: [
          { name: 'Sarson ka Saag', type: 'vegetarian', dietary: [ 'gluten-free'] },
          { name: 'Makki di Roti', type: 'vegetarian', dietary: ['vegan'] },
          { name: 'Butter Chicken', type: 'non-vegetarian', dietary: [' vegan'] },
          { name: 'Amritsari Kulcha', type: 'vegetarian', dietary: ['vegan'] },
          { name: 'Lassi', type: 'vegetarian', dietary: ['vegan'] }
        ]
      },
      // More regions with similar structure...

      // Southern India Example
      { 
        region: 'Andhra Pradesh', 
        dishes: [
          { name: 'Hyderabadi Biryani', type: 'non-vegetarian', dietary: ['halal'] },
          { name: 'Gongura Pachadi', type: 'vegetarian', dietary: ['gluten-free'] },
          { name: 'Pesarattu', type: 'vegetarian', dietary: ['halal'] },
          { name: 'Pulihora', type: 'vegetarian', dietary: ['gluten-free'] }
        ]
      },
      // Union Territories Example
      { 
        region: 'Andaman & Nicobar Islands', 
        dishes: [
          { name: 'Fish Curry', type: 'non-vegetarian', dietary: ['halal'] },
          { name: 'Coconut Prawn Curry', type: 'non-vegetarian', dietary: ['halal'] }
        ]
      }
    ];

    return of(cuisines);
  }
}