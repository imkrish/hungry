import { Restaurant } from './restaurant.types';
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
import { RestaurantService } from './restaurant.service';
import { PaginationArgs } from '../shared/args.types';
import { NewRestaurantDataInput } from './restaurant.inputs';
import { DishService } from '../dish/dish.service';
import { Dish } from '../dish/dish.types';

enum RestaurantEvents {
  RESTAURANT_CREATED = 'RESTAURANT_CREATED'
}

@Resolver(of => Restaurant)
export class RestaurantResolver {
  restaurantService: RestaurantService;
  dishService: DishService;

  constructor() {
    this.restaurantService = new RestaurantService();
    this.dishService = new DishService();
  }

  // Queries
  @Query(returns => Restaurant)
  restaurant(@Arg('id') id: string): Restaurant {
    return this.restaurantService.findById(id);
  }

  @Query(returns => [Restaurant])
  restaurants(@Args() paginationArgs: PaginationArgs): Restaurant[] {
    return this.restaurantService.findAll(paginationArgs);
  }

  // Mutations
  @Mutation(returns => Restaurant)
  async createRestaurant(
    @PubSub(RestaurantEvents.RESTAURANT_CREATED)
    publish: Publisher<Restaurant>,
    @Arg('newRestaurantData') newRestaurantData: NewRestaurantDataInput
  ): Promise<Restaurant> {
    const restaurant = this.restaurantService.create(newRestaurantData);
    await publish(restaurant);
    return restaurant;
  }

  @Mutation(returns => Restaurant)
  removeRestaurant(@Arg('id') id: string): Restaurant {
    return this.restaurantService.remove(id);
  }

  // Subscriptions
  @Subscription(returns => Restaurant, {
    topics: RestaurantEvents.RESTAURANT_CREATED
  })
  restaurantCreated(@Root() restaurant: Restaurant): Restaurant {
    return restaurant;
  }

  // Field Resolvers
  @FieldResolver()
  dishes(@Root() restaurant: Restaurant): Dish[] {
    return this.dishService
      .getDishIdsByRestaurantId(restaurant.id)
      .map(this.dishService.findById);
  }
}
