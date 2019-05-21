import { PaginationArgs } from '../shared/args.types';
import { Restaurant } from './restaurant.types';

export class RestaurantService {
  findById(id: string): Restaurant {
    return null;
  }

  findAll(paginationArgs: PaginationArgs): Restaurant[] {
    return [];
  }
}
