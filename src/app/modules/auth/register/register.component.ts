import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProfile } from 'src/app/models/Profile';
import { IUser } from 'src/app/models/User';
import { IAuthService } from 'src/app/services/auth/IAuthService';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  hidePassword = true;

  constructor(private router: Router, private authService: IAuthService) {
    this.registerFormGroup = new FormGroup({
      profileId: new FormControl(uuidv4()),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  registerSubmit(registerForm: FormGroup) {
    
    const register = registerForm.value;
    const profile: IProfile = {
      id: uuidv4(),
      firstName: register.firstName,
      lastName: register.lastName,
    }

    const user: IUser = {
      id: uuidv4(),
      email: register.email,
      profile,
    };
    this.authService.register(user).subscribe((res) => {
      this.router.navigate(['/dashboard']);
    });
  }
}
