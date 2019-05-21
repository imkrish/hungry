import { Field, ID, ObjectType } from 'type-graphql';
import { Dish } from '../dish/dish.types';

@ObjectType()
export class Restaurant {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  imgUrl: string;

  @Field()
  creationDate: number;

  // Field resolver will generate this
  @Field(returns => [Dish])
  dishes?: Dish[];
}
