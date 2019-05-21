import { Restaurant } from './restaurant.types';
import {
  Arg,
  Args,
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

enum RestaurantsSubscriptions {
  RESTAURANT_CREATED = 'RESTAURANT_CREATED'
}

@Resolver(Restaurant)
export class RestaurantResolver {
  restaurantsService: RestaurantService;

  constructor() {
    this.restaurantsService = new RestaurantService();
  }

  @Query(returns => Restaurant)
  restaurant(@Arg('id') id: string): Restaurant {
    return this.restaurantsService.findById(id);
  }

  @Query(returns => [Restaurant])
  restaurants(@Args() paginationArgs: PaginationArgs): Restaurant[] {
    return this.restaurantsService.findAll(paginationArgs);
  }

  @Mutation(returns => Restaurant)
  async createRestaurant(
    @PubSub(RestaurantsSubscriptions.RESTAURANT_CREATED)
    publish: Publisher<Restaurant>,
    @Arg('newRestaurantData') newRestaurantData: NewRestaurantDataInput
  ): Promise<Restaurant> {
    const restaurant = this.restaurantsService.create(newRestaurantData);
    await publish(restaurant);
    return restaurant;
  }

  @Mutation(returns => Restaurant)
  removeRestaurant(@Arg('id') id: string): Restaurant {
    return this.restaurantsService.remove(id);
  }

  @Subscription(returns => Restaurant, {
    topics: RestaurantsSubscriptions.RESTAURANT_CREATED
  })
  restaurantCreated(@Root() restaurant: Restaurant): Restaurant {
    return restaurant;
  }
}
