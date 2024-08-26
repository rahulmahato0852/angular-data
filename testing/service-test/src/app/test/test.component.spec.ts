import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { UserService } from '../services/user.service';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let userService: UserService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [UserService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should load users on init', () => {
    expect(component.users.length).toBe(5);
    expect(component.users).toEqual(['rushi', 'rahul', 'amol', 'vishal', 'vishnu']);
  });

  it('should add a user', () => {
    component.addUsers();
    expect(component.users.length).toBe(6);
    // expect(component.users).toContain('New User');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
