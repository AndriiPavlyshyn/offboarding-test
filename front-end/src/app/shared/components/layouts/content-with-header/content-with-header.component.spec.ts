import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWithHeaderComponent } from './content-with-header.component';

describe('ContentWithHeaderComponent', () => {
  let component: ContentWithHeaderComponent;
  let fixture: ComponentFixture<ContentWithHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentWithHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentWithHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
