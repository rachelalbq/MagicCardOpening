import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDisplayPageComponent } from './card-display-page.component';

describe('CardDisplayPageComponent', () => {
  let component: CardDisplayPageComponent;
  let fixture: ComponentFixture<CardDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDisplayPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
