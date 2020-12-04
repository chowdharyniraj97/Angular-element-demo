import { Component, Input, OnChanges, ViewEncapsulation, SimpleChange, SimpleChanges } from '@angular/core';
import {WeatherService } from './weather.service';
import {Weathermodel} from '../models/weathermodel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WeatherComponent implements OnChanges {
  // @Input('location') location:string;
  // @Input('unit') unit:string;
  @Input() model : any;
  public errText: string = '';
  public weathersubscription;
  public temp:number;
  public desc: string;
  public weatherico: string;
  public country: string;
  public city: string;
  public dt: Date;
  constructor(
    public _ws: WeatherService
  ) { }

  renderWeather() {
    // this.model = new Weathermodel({'location': this.location, 'unit':this.unit});
    // alert(this.model)
    // console.log(JSON.stringify(this.model));
    // alert(this.model.location)
      // console.log(typeof this.model);
      // console.log(this.model);
    // console.log(JSON.stringify(typeof this.model));
    //   console.log(JSON.stringify(this.model.location));
      // console.log(this.model.unit);
      // console.log(typeof this.model.location);
      // const myobj = JSON.parse(this.model)
      // console.log(myobj);
    alert(this.model + 'from component')
    console.log(this.model)
      this.weathersubscription = this._ws.getWeather(this.model.location, this.model.unit).subscribe((data) => {
        console.log(data);
        this.errText = '';
        this.temp = Math.round(data.main.temp);
        this.desc = data.weather[0].description;
        this.weatherico = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        this.city = data.name;
        this.country = data.sys.country;
        this.getLocalTime(data.coord.lat, data.coord.lon);

      }, error => {
        this.errText = error;
      });
    }


  getLocalTime(lat, long) {
    this._ws.getLocalTime(lat, long).subscribe((data) => {
      this.dt = data.time;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('HEYYYYYYYYYYY');
    // if(changes['location'] || changes['unit']){
      if (this.weathersubscription) {
        this.weathersubscription.unsubscribe();
      }
      this.renderWeather();
    }

  // }


}
