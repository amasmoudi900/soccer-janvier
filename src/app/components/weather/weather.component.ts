import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm: FormGroup;
  weatherResult: any;
  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.fb.group({
      city: ["", Validators.required]
    })
  }

  search() {
    console.log("here city", this.weatherForm.value);
    this.weatherService.searchWeather(this.weatherForm.value.city).subscribe(
      (data) => {
        console.log("Here result from BE", data.result);
        this.weatherResult = data.result;
      }
    );
  }

}
