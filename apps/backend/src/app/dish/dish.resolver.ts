import { Dish } from './dish.types';
import { DishService } from './dish.service';
import { PaginationArgs } from '../shared/args.types';
import { NewDishDataInput } from './dish.inputs';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant } from '../restaurant/restaurant.types';
import { Publisher } from 'type-graphql';

enum DishEvents {
  DISH_CREATED = 'DISH_CREATED'
}

// Todo: Make this class be come resolver of type Dish
export class DishResolver {
  dishService: DishService;
  restaurantService: RestaurantService;

  constructor() {
    this.dishService = new DishService();
    this.restaurantService = new RestaurantService();
  }

  // Todo: Query 1
  dish(id: string): Dish {
    return null;
  }

  // Todo: Query 2
  dishes(paginationArgs: PaginationArgs): Dish[] {
    return [];
  }

  // Todo: Mutation 1
  removeDish(id: string): Dish {
    return null;
  }

  // Todo: Field Resolver
  restaurant(dish: Dish): Restaurant {
    return null;
  }

  // Todo: Subscription (Listen to DishEvents.DISH_CREATED and return the new dish information)
  dishCreated(dish: Dish): Dish {
    return null;
  }

  // Todo: Mutation 2 (It will publish DishEvents.DISH_CREATED with new dish information)
  async createDish(
    publish: Publisher<Dish>,
    newDishData: NewDishDataInput
  ): Promise<Dish> {
    return null;
  }
}
