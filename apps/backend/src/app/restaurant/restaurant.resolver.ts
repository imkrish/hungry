import { Restaurant } from './restaurant.types';
import {
  Arg,
  Args,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { RestaurantService } from './restaurant.service';
import { PaginationArgs } from '../shared/args.types';
import { NewRestaurantDataInput } from './restaurant.inputs';

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
    @Arg('newRestaurantData') newRestaurantData: NewRestaurantDataInput
  ): Promise<Restaurant> {
    return this.restaurantsService.create(newRestaurantData);
  }

  @Mutation(returns => Restaurant)
  removeRestaurant(@Arg('id') id: string): Restaurant {
    return this.restaurantsService.remove(id);
  }
}
