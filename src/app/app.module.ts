import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { WeatherComponent } from './weather/weather.component';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [TopNavbarComponent, WeatherComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [DatePipe],
  bootstrap: [TopNavbarComponent]
})
export class AppModule {}
