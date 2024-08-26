import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reusable-compo';

  arr = Array.from({ length: 10 })


  formConfig: { value?: string, name: string, required: boolean, type?: string, options?: string[] }[] = [
    { type: "text", name: "name", required: true },
    { type: "text", name: "email", required: true },
    { type: "text", name: "mobile", required: true },
    { type: "text", name: "password", required: true },
    { value: "male", type: "radio", name: "Gender", required: true, options: ["male", "female"] },
    { type: "checkbox", name: "skills", required: true, options: ["react", "angular", "javascript", "docker", "nodejs", "mongoDB", "express.js"] }
  ]

  handleSubmit(arg: FormData) {
    console.log(arg);
  }


}
