import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { WeatherComponent } from "./weather/weather.component";

@NgModule({
  declarations: [TopNavbarComponent, WeatherComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [TopNavbarComponent]
})
export class AppModule {}
