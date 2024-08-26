import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authStateType } from '../../store/reducers/auth.reducers';
import Swal from 'sweetalert2';
import { loginUser } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  loginForm: FormGroup = new FormGroup({})


  constructor(private store: Store<{ authReducer: authStateType }>, private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
  }


  handleSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(loginUser({ data: this.loginForm.value }))
    } else {
      Swal.fire({
        icon: "error",
        text: "All fields are required"
      })
    }
  }




}
