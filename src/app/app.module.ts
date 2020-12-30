import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { AuthModule } from './layouts/auth/auth.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProfileService } from './services/profile.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    MatSnackBar,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
