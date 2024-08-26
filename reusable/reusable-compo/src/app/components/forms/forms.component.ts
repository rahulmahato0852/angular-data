import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  @Input() formConfig: { value?: string, name: string, required: boolean, type?: string, options?: string[] }[] = []
  @Output() onSubmit: EventEmitter<FormData> = new EventEmitter()

  form: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    const formGroup: { [key: string]: AbstractControl } = {};
    this.formConfig.forEach(field => {
      if (field.type === "checkbox") {
        formGroup[field.name] = new FormArray([]);
      } else {
        const control = this.fb.control(field.value || "", Validators.required);
        formGroup[field.name] = control;
      }
    });
    this.form = this.fb.group(formGroup);
  }



  handleSubmit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value)
    } else {
      Swal.fire({
        icon: "error",
        text: "All Fields are required"
      })
    }
  }









}
