import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private authService: AuthService
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
      this.router.navigate(['/dashboard'])
    })
  }
}
