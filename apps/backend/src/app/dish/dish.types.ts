import { Field, ID, ObjectType } from 'type-graphql';
import { Restaurant } from '../restaurant/restaurant.types';

@ObjectType()
export class Dish {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  imgUrl: string;

  @Field()
  price: number;

  @Field()
  creationDate: number;

  restaurantId: string;

  // Field resolver will generate this
  @Field(returns => Restaurant)
  restaurant?: Restaurant;
}
