import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authStateType } from '../../store/reducers/auth.reducers';
import { registerUser } from '../../store/actions/auth.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  registerForm: FormGroup = new FormGroup({})



  constructor(private store: Store<{ authReducer: authStateType }>, private fb: FormBuilder) {

    this.registerForm = fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      mobile: ["", Validators.required],
    })

  }


  handleSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(registerUser({ data: this.registerForm.value }))
    } else {
      Swal.fire({
        icon: "error",
        text: "All fields are required"
      })
    }
  }




}
