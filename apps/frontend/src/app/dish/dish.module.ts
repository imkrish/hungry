import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishRoutingModule } from './dish-routing.module';
import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dish/dish.component';

@NgModule({
  declarations: [DishComponent, DishesComponent],
  imports: [CommonModule, DishRoutingModule]
})
export class DishModule {}
