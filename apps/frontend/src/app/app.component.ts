import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestaurantService } from './restaurant/restaurant.service';

@Component({
  selector: 'hungry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  restaurantCount$: Observable<number>;

  constructor(private restaurantService: RestaurantService) {
    this.restaurantCount$ = this.restaurantService
      .listenToAllRestaurant()
      .pipe(map(restaurants => restaurants.length));
  }

  ngOnInit() {}
}
