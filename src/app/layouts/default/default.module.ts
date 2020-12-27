import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatDividerModule,
    MatSidenavModule
  ]
})
export class DefaultModule { }
