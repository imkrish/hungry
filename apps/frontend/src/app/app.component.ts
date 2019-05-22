import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestaurantService } from './restaurant/restaurant.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'hungry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUrl$: Observable<string>;
  restaurantCount$: Observable<number>;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private notification: NzNotificationService
  ) {
    this.currentUrl$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url)
    );

    this.restaurantCount$ = this.restaurantService
      .listenToAllRestaurant()
      .pipe(map(restaurants => restaurants.length));
  }

  ngOnInit() {
    this.restaurantService.restaurantCreated().subscribe(restaurant => {
      this.notification.blank('Restaurant Created', restaurant.name);
    });
  }
}
