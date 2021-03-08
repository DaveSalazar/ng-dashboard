import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthService } from 'src/app/services/auth/IAuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  hidePassword = true;

  constructor(
    private router: Router,
    private authService: IAuthService
  ) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })
   }

  ngOnInit(): void {
  }

  loginSubmit() {
    this.authService.login(this.loginFormGroup.value)
    .subscribe(res => {
      console.log('submit')
      this.router.navigate(['/dashboard'])
    })
  }

  
}
