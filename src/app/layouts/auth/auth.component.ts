import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  hidePassword = true;
  
  constructor() { 
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })

    this.registerFormGroup = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  loginSubmit() {}

  registerSubmit() {}
}
