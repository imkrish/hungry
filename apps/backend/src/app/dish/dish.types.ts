import { Field, ID, ObjectType } from 'type-graphql';

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
}
