import { Dish } from './dish.types';
import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription
} from 'type-graphql';
import { DishService } from './dish.service';
import { PaginationArgs } from '../shared/args.types';
import { NewDishDataInput } from './dish.inputs';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant } from '../restaurant/restaurant.types';

enum DishEvents {
  DISH_CREATED = 'DISH_CREATED'
}

@Resolver(of => Dish)
export class DishResolver {
  dishService: DishService;
  restaurantService: RestaurantService;

  constructor() {
    this.dishService = new DishService();
    this.restaurantService = new RestaurantService();
  }

  // Queries
  @Query(returns => Dish)
  dish(@Arg('id') id: string): Dish {
    return this.dishService.findById(id);
  }

  @Query(returns => [Dish])
  dishes(@Args() paginationArgs: PaginationArgs): Dish[] {
    return this.dishService.findAll(paginationArgs);
  }

  // Mutations
  @Mutation(returns => Dish)
  async createDish(
    @PubSub(DishEvents.DISH_CREATED)
    publish: Publisher<Dish>,
    @Arg('newDishData') newDishData: NewDishDataInput
  ): Promise<Dish> {
    const { restaurantId } = newDishData;
    const restaurant = this.restaurantService.findById(restaurantId);
    if (!restaurant) {
      throw new Error(`Restaurant could not be found: ${restaurantId}`);
    }
    const dish = this.dishService.create(newDishData);
    await publish(dish);
    return dish;
  }

  @Mutation(returns => Dish)
  removeDish(@Arg('id') id: string): Dish {
    return this.dishService.remove(id);
  }

  // Subscriptions
  @Subscription(returns => Dish, {
    topics: DishEvents.DISH_CREATED
  })
  dishCreated(@Root() dish: Dish): Dish {
    return dish;
  }

  // Field Resolvers
  @FieldResolver()
  restaurant(@Root() dish: Dish): Restaurant {
    return this.restaurantService.findById(dish.restaurantId);
  }
}
