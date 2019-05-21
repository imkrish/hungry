import { Restaurant } from '../restaurant/restaurant.types';

interface DB {
  restaurants: { [id: string]: Restaurant };
}

export const db: DB = {
  restaurants: {}
};
