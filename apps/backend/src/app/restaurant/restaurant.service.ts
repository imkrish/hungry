import { PaginationArgs } from '../shared/args.types';
import { NewRestaurantDataInput } from './restaurant.inputs';
import { Restaurant } from './restaurant.types';

export class RestaurantService {
  findById(id: string): Restaurant {
    return null;
  }

  findAll(paginationArgs: PaginationArgs): Restaurant[] {
    return [];
  }

  create(newRestaurantData: NewRestaurantDataInput): Restaurant {
    return null;
  }

  remove(id: string): Restaurant {
    return null;
  }
}
