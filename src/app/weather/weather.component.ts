import { Component, OnInit } from "@angular/core";
import { createOfflineCompileUrlResolver } from "@angular/compiler";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  city: string = "";
  state: string = "";

  constructor() {}
  ngOnInit() {}

  getWeatherData(city, state): void {
    console.log(city);
    console.log(state);
  }
}
