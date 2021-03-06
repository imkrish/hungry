import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsComponent } from './restaurant/restaurants/restaurants.component';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantsComponent },
  { path: '**', redirectTo: '/restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
