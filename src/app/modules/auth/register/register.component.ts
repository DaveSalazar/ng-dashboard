import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  hidePassword = true;

  constructor(
    private authService: AuthService
  ) { 
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

  registerSubmit() {
    this.authService.register(this.registerFormGroup.value)
    .subscribe(res => console.log)
  }
}
