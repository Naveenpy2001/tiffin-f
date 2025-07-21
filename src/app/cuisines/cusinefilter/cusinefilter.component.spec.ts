import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineFilterComponent } from './cusinefilter.component';

describe('CusinefilterComponent', () => {
  let component: CuisineFilterComponent;
  let fixture: ComponentFixture<CuisineFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuisineFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuisineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
