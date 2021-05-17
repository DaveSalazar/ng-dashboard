import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './layouts/auth/auth.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MainModule } from './layouts/main/main.module';
import { AuthMockService } from './services/auth/auth-mock.service';
import { IAuthService } from './services/auth/IAuthService';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    BrowserAnimationsModule
  ],

  providers: [
    {
      provide: IAuthService,
      useClass: AuthMockService
    },
    MatSnackBar,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
