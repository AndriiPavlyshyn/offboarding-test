import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingTableComponent } from './offboarding-table.component';

describe('OffboardingTableComponent', () => {
  let component: OffboardingTableComponent;
  let fixture: ComponentFixture<OffboardingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffboardingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
