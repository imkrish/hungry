import { PaginationArgs } from '../shared/args.types';
import { NewRestaurantDataInput } from './restaurant.inputs';
import { Restaurant } from './restaurant.types';
import { db } from '../db/db';
import * as uuid from 'uuid/v4';
import * as R from 'ramda';

export class RestaurantService {
  findById = (id: string): Restaurant => {
    return db.restaurants[id];
  };

  findAll = (paginationArgs: PaginationArgs): Restaurant[] => {
    const { skip, take } = paginationArgs;
    const sortByCreationDateDesc = R.sortWith([
      R.descend(R.prop('creationDate'))
    ]);
    const skipAndTake = R.slice(skip, skip + take);
    return R.compose(
      skipAndTake,
      sortByCreationDateDesc,
      R.values
    )(db.restaurants) as Restaurant[];
  };

  create = (newRestaurantData: NewRestaurantDataInput): Restaurant => {
    const id = uuid();
    const newRestaurant: Restaurant = {
      ...newRestaurantData,
      id,
      creationDate: Date.now()
    };
    db.restaurants[id] = newRestaurant;
    return newRestaurant;
  };

  remove = (id: string): Restaurant => {
    const deletedRestaurant = db.restaurants[id];
    this.removeRestaurantDishRelationShip(deletedRestaurant);
    delete db.restaurants[id];
    return deletedRestaurant;
  };

  private removeRestaurantDishRelationShip = (restaurant: Restaurant) => {
    delete db.restaurantDishes[restaurant.id];
  };
}
