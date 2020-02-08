export interface CurrentWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  description: string; // weather description
  image: string; // weather icon name
  location: string;
}

export interface HourlyWeather {
  weather: CurrentWeather[];
}
