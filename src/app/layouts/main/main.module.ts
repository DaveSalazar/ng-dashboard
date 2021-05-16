import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { FooterComponent } from 'src/app/modules/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import { SidebarComponent } from 'src/app/modules/shared/components/sidebar/sidebar.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class MainModule { }
