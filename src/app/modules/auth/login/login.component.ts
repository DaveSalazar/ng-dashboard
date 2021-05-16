import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
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
      this.router.navigate(['/dashboard'])
    },
    err => {
      console.log(err)
      this.snackBar.open(err.error.message, 'Aceptar', {
        duration: 2000,
      });
    })
  }

  
}
