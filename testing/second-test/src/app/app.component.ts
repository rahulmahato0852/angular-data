import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'second-test';

  changeTitle() {
    this.title = "new Titel"
  }

  num = 10


  addition(arg: number) {
    this.num = this.num + arg
  }

  multiply(arg: number) {
    this.num = arg * this.num
  }






}
