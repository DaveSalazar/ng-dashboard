import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  hidePassword = true;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })

    this.registerFormGroup = new FormGroup({
      id: new FormControl(uuidv4()),
      profileId: new FormControl(uuidv4()),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  loginSubmit() {
    this.authService.login(this.loginFormGroup.value)
    .subscribe(res => {
      this.router.navigate(['/dashboard'])
    })
  }

  registerSubmit() {
    this.authService.register(this.registerFormGroup.value)
    .subscribe(res => console.log)
  }
}
