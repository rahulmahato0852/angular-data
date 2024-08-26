import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPagiComponent } from './new-pagi.component';

describe('NewPagiComponent', () => {
  let component: NewPagiComponent;
  let fixture: ComponentFixture<NewPagiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPagiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPagiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
