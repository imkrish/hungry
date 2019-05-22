import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsComponent } from './restaurant/restaurants/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant/restaurant.component';
import { DishesComponent } from './dish/dishes/dishes.component';
import { DishComponent } from './dish/dish/dish.component';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'restaurant/:id', component: RestaurantComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'dish/:id', component: DishComponent },
  { path: '**', redirectTo: '/restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
