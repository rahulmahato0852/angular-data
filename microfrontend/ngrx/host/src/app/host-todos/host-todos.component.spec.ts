import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostTodosComponent } from './host-todos.component';

describe('HostTodosComponent', () => {
  let component: HostTodosComponent;
  let fixture: ComponentFixture<HostTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
