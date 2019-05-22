import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  Mutation,
  MutationCreateRestaurantArgs,
  Query,
  Restaurant
} from '../generated/graphql';
import {
  CreateRestaurant,
  RestaurantCreated,
  RestaurantsNameImageUrl
} from './restaurant.gql';
import { map, scan, startWith } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private apollo: Apollo) {}

  loadRestaurants(): Observable<Restaurant[]> {
    return this.apollo
      .query<Query>({ query: RestaurantsNameImageUrl })
      .pipe(map(response => response.data.restaurants));
  }

  restaurantCreated(): Observable<Restaurant> {
    return this.apollo
      .subscribe({
        query: RestaurantCreated
      })
      .pipe(map(response => response.data.restaurantCreated));
  }

  createRestaurant(name: string, imgUrl: string): Observable<Restaurant> {
    return this.apollo
      .mutate<Mutation, MutationCreateRestaurantArgs>({
        mutation: CreateRestaurant,
        variables: {
          newRestaurantData: {
            name,
            imgUrl
          }
        }
      })
      .pipe(map(response => response.data.createRestaurant));
  }

  listenToAllRestaurant() {
    const restaurants$ = this.loadRestaurants();

    const newRestaurants$: Observable<
      Restaurant[]
    > = this.restaurantCreated().pipe(
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
