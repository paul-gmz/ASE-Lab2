import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { WeatherComponent } from "./weather/weather.component";

@NgModule({
  declarations: [AppComponent, TopNavbarComponent, WeatherComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [TopNavbarComponent]
})
export class AppModule {}
