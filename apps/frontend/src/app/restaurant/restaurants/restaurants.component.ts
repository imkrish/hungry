import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Query, Restaurant } from '../../generated/graphql';
import { combineLatest, Observable } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { RestaurantCreated, RestaurantsNameImageUrl } from '../restaurant.gql';

@Component({
  selector: 'hungry-restaurants',
  template: `
    <h1>Restaurants</h1>
    <div class="container" nz-row nzType="flex" nzJustify="start">
      <div
        nz-col
        nzSpan="4"
        class="p-10"
        *ngFor="let restaurant of (allRestaurants$ | async)"
      >
        <nz-card nzHoverable [nzCover]="coverTemplate">
          <nz-card-meta [nzTitle]="restaurant.name"></nz-card-meta>
        </nz-card>
        <ng-template #coverTemplate>
          <img class="image" [src]="restaurant.imgUrl" />
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .p-10 {
        padding: 10px;
      }

      .image {
        height: 300px;
        object-fit: cover;
        object-position: center;
      }
    `
  ]
})
export class RestaurantsComponent implements OnInit {
  allRestaurants$: Observable<Restaurant[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    const restaurants$ = this.apollo
      .query<Query>({ query: RestaurantsNameImageUrl })
      .pipe(map(response => response.data.restaurants));

    const newRestaurants$: Observable<Restaurant[]> = this.apollo
      .subscribe({
        query: RestaurantCreated
      })
      .pipe(
        map(response => response.data.restaurantCreated),
        scan((restaurants, newRestaurant) => {
          return [newRestaurant].concat(restaurants);
        }, []),
        startWith([])
      );

    this.allRestaurants$ = combineLatest(restaurants$, newRestaurants$).pipe(
      map(([restaurants, newRestaurants]) => {
        return newRestaurants.concat(restaurants);
      })
    );
  }
}
