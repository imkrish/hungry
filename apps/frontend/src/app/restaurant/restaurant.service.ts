import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Restaurant } from '../generated/graphql';
import { filter, map, scan, startWith } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private apollo: Apollo) {}

  // Todo: Query to get restaurant
  loadRestaurants(): Observable<Restaurant[]> {
    return of([]);
  }

  // Todo: Mutation to create restaurant
  createRestaurant(name: string, imgUrl: string): Observable<Restaurant> {
    return of(null);
  }

  // Todo: Subscription
  restaurantCreated(): Observable<Restaurant> {
    return of(null);
  }

  listenToAllRestaurant() {
    const restaurants$ = this.loadRestaurants();

    const newRestaurants$: Observable<
      Restaurant[]
    > = this.restaurantCreated().pipe(
      filter(Boolean),
      scan(
        (restaurants, newRestaurant) => {
          return [newRestaurant].concat(restaurants);
        },
        [] as any
      ),
      startWith([])
    );

    return combineLatest(restaurants$, newRestaurants$).pipe(
      map(([restaurants, newRestaurants]) => {
        return newRestaurants.concat(restaurants);
      })
    );
  }
}
