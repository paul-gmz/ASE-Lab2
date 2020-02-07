import { Component, OnInit } from "@angular/core";
import { createOfflineCompileUrlResolver } from "@angular/compiler";
import { State } from "./state";
import { WeatherService } from "./weather.service";
import { WeatherData } from "./weatherData";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
  city: string = "";
  state: string = "";
  currWeatherdata: WeatherData;
  errorMsg: string;
  showWeatherData: boolean = false;
  clickStream: Observable<any> = new Subject<any>();
  isCityData: boolean = false;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {}

  handleClick(event: Event) {
    if (this.city != "" || this.state != "") {
      if (this.city != "") {
        this.isCityData = true;
        this.weatherService.getCurrentWeatherByCity(this.city).subscribe(
          cwd => (this.currWeatherdata = cwd),
          error => (this.errorMsg = <any>error)
        );
        this.showWeatherData = true;
        console.log(this.currWeatherdata);
      } else {
        this.isCityData = false;
        if (this.state.length == 2) {
          let s = new State(this.state);
          this.state = s.getState(this.state);
        }
        console.log(this.state);
        this.weatherService.getCurrentWeatherByCity(this.state).subscribe(
          cwd => (this.currWeatherdata = cwd),
          error => (this.errorMsg = <any>error)
        );
        this.showWeatherData = true;
      }
    } else {
      alert("Fill at least one textbox");
    }
  }
}
