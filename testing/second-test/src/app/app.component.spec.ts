import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    tick(); // Simulate passage of time until async activities complete
  }));

  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    tick(); // Simulate passage of time until async activities complete
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'second-test'`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    tick(); // Simulate passage of time until async activities complete
    expect(app.title).toEqual('second-test');
  }));

  it('should render title', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick(); // Simulate passage of time until async activities complete
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, second-test');
  }));

  it('should change the title', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.changeTitle();
    fixture.detectChanges(); // Apply the change to the template
    tick(); // Simulate passage of time until async activities complete
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('new Titel');
  }));

  it('should add the number correctly', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const initialNum = app.num;
    const num = 50;
    app.addition(num);
    tick(); // Simulate passage of time until async activities complete
    expect(app.num).toEqual(initialNum + num);
  }));


  it('should multiply the number correctly', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    const initialNum = app.num
    const num = 4
    app.multiply(num)
    tick()
    expect(app.num).toEqual(initialNum * num);
  }))





});
