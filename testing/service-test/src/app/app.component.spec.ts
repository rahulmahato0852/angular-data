import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'test', component: TestComponent }
        ]),
        AppComponent,
        TestComponent,

      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'service-test' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('service-test');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, service-test');
  });

  it('navigate to "test" takes you to /test', async () => {
    await router.navigate(['/test']);
    fixture.detectChanges();
    expect(location.path()).toBe('/test');
  });
});
