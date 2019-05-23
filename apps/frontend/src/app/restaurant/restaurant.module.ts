import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [RestaurantsComponent],
  imports: [CommonModule, RestaurantRoutingModule, NgZorroAntdModule]
})
export class RestaurantModule {}
