import { PaginationArgs } from '../shared/args.types';
import { NewDishDataInput } from './dish.inputs';
import { Dish } from './dish.types';
import { db } from '../db/db';
import * as uuid from 'uuid/v4';
import * as R from 'ramda';

export class DishService {
  findById(id: string): Dish {
    return db.dishes[id];
  }

  findAll(paginationArgs: PaginationArgs): Dish[] {
    const { skip, take } = paginationArgs;
    const sortById = R.sortBy(R.prop('creationDate'));
    const skipAndTake = R.slice(skip, skip + take);
    return R.compose(
      skipAndTake,
      sortById,
      R.values
    )(db.dishes) as Dish[];
  }

  create(newDishData: NewDishDataInput): Dish {
    const id = uuid();
    const newDish: Dish = {
      ...newDishData,
      id,
      creationDate: Date.now()
    };
    db.dishes[id] = newDish;
    return newDish;
  }

  remove(id: string): Dish {
    const deletedDish = db.dishes[id];
    delete db.dishes[id];
    return deletedDish;
  }
}
