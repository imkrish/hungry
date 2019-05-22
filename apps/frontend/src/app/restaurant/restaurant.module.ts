import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

@NgModule({
  declarations: [RestaurantComponent, RestaurantsComponent],
  imports: [CommonModule, RestaurantRoutingModule]
})
export class RestaurantModule {}
