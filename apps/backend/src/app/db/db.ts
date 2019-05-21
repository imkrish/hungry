import { Restaurant } from '../restaurant/restaurant.types';
import * as jsonfile from 'jsonfile';
import { Dish } from '../dish/dish.types';

interface DB {
  restaurants: { [id: string]: Restaurant };
  dishes: { [id: string]: Dish };
}

export let db: DB = {
  restaurants: {},
  dishes: {}
};

export class DBHandler {
  static write() {
    jsonfile.writeFileSync('./db.json', db);
  }

  static read() {
    try {
      db = jsonfile.readFileSync('./db.json') || db;
    } catch (e) {}
  }
}
