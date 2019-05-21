import { Dish } from './dish.types';
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
import { DishService } from './dish.service';
import { PaginationArgs } from '../shared/args.types';
import { NewDishDataInput } from './dish.inputs';

enum DishsSubscriptions {
  RESTAURANT_CREATED = 'RESTAURANT_CREATED'
}

@Resolver(Dish)
export class DishResolver {
  dishService: DishService;

  constructor() {
    this.dishService = new DishService();
  }

  @Query(returns => Dish)
  dish(@Arg('id') id: string): Dish {
    return this.dishService.findById(id);
  }

  @Query(returns => [Dish])
  dishes(@Args() paginationArgs: PaginationArgs): Dish[] {
    return this.dishService.findAll(paginationArgs);
  }

  @Mutation(returns => Dish)
  async createDish(
    @PubSub(DishsSubscriptions.RESTAURANT_CREATED)
    publish: Publisher<Dish>,
    @Arg('newDishData') newDishData: NewDishDataInput
  ): Promise<Dish> {
    const dish = this.dishService.create(newDishData);
    await publish(dish);
    return dish;
  }

  @Mutation(returns => Dish)
  removeDish(@Arg('id') id: string): Dish {
    return this.dishService.remove(id);
  }

  @Subscription(returns => Dish, {
    topics: DishsSubscriptions.RESTAURANT_CREATED
  })
  dishCreated(@Root() dish: Dish): Dish {
    return dish;
  }
}
