import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinesfilterComponent } from './cuisinesfilter.component';

describe('CuisinesfilterComponent', () => {
  let component: CuisinesfilterComponent;
  let fixture: ComponentFixture<CuisinesfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuisinesfilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuisinesfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
