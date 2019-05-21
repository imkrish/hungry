import { Restaurant } from '../restaurant/restaurant.types';
import * as jsonfile from 'jsonfile';

interface DB {
  restaurants: { [id: string]: Restaurant };
}

export let db: DB = {
  restaurants: {}
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
