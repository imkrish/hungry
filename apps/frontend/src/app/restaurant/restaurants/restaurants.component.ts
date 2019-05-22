import { Component } from '@angular/core';
import { Restaurant } from '../../generated/graphql';
import { Observable } from 'rxjs';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'hungry-restaurants',
  templateUrl: 'restaurants.component.html',
  styleUrls: ['restaurants.component.scss']
})
export class RestaurantsComponent {
  allRestaurants$: Observable<Restaurant[]>;
  displayModal: boolean;

  constructor(private restaurantService: RestaurantService) {
    this.displayModal = false;

    this.allRestaurants$ = this.restaurantService.listenToAllRestaurant();
  }

  setDisplayModal(display: boolean) {
    this.displayModal = display;
  }

  newRestaurant(nameInput: HTMLInputElement, imgUrlInput: HTMLInputElement) {
    const name = nameInput.value;
    const imgUrl = imgUrlInput.value;

    this.setDisplayModal(false);

    if (name && imgUrl) {
      this.restaurantService
        .createRestaurant(name, imgUrl)
        .subscribe(console.log);
    }

    nameInput.value = '';
    imgUrlInput.value = '';
  }
}
